import { WebSocket, WebSocketServer } from "ws";
import { parse } from "url";
import { createServer, type IncomingMessage } from "http";

const rooms = new Map<string, Set<WebSocket>>();
const PORT = Number(process.env.PORT) || 8080;
const SELF_URL = process.env.NEXT_PUBLIC_WS_SERVER_LINK || `http://localhost:${PORT}`;

const httpServer = createServer((req, res) => {
  if (req.url === "/health") {
    res.end();
    return;
  }
});

const wss = new WebSocketServer({ server: httpServer });

function broadcastUserCount(roomId: string, newClient?: WebSocket) {
  const room = rooms.get(roomId);
  if (!room) return;

  const payloadForExisting = JSON.stringify({
    type: "userCount",
    count: room.size,
    ImNew: false,
  });
  const payloadForNew = JSON.stringify({
    type: "userCount",
    count: room.size,
    ImNew: true,
  });

  room.forEach((client) => {
    if (client.readyState !== WebSocket.OPEN) return;

    if (client === newClient) {
      client.send(payloadForNew);
    } else {
      client.send(payloadForExisting);
    }
  });
}

wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
  if (!req.url) {
    ws.close(1008, "URL is required");
    return;
  }

  const { query } = parse(req.url, true);
  const roomId = query.roomId;
  if (!roomId || typeof roomId !== "string") {
    ws.close(1008, "Room ID is required");
    return;
  }

  if (!rooms.has(roomId)) rooms.set(roomId, new Set());
  const room = rooms.get(roomId)!;
  room.add(ws);

  broadcastUserCount(roomId, ws);

  ws.on("error", console.error);

  ws.on("message", (message) => {
    room.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    room.delete(ws);
    broadcastUserCount(roomId);

    if (room.size === 0) {
      rooms.delete(roomId);
      console.log(`Room ${roomId} is now empty.`);
    }
  });
});

httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is listening on port ${PORT}`);

  if (process.env.NODE_ENV === "production" && SELF_URL) {
    console.log(`Setting up keep-alive ping for ${SELF_URL}`);
    setInterval(
      async () => {
        try {
          console.log(`Sending keep-alive ping to ${SELF_URL}/health`);
          const response = await fetch(`${SELF_URL}/health`);
          if (response.ok) {
            console.log("Keep-alive ping successful:", response.status);
          } else {
            console.warn("Keep-alive ping returned bad status:", response.status);
          }
        } catch (error) {
          console.error("Keep-alive ping failed:", error);
        }
      },
      14 * 60 * 1000
    );
  }
});
