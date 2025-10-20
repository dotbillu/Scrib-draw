# Scrib-Draw

A modern, collaborative drawing application built with React, Konva.js, and TypeScript.

**[Live Demo](https://scrib-draw-web.vercel.app/)**

## Features

-  Interactive canvas with smooth drawing powered by Konva.js
-  Pen and eraser tools with customizable properties
-  Draggable canvas for easy navigation
-  Real-time collaboration via WebSocket
-  Modern UI with Next.js and Tailwind CSS

## Tech Stack

### Frontend
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Libraries
![Konva.js](https://img.shields.io/badge/Konva.js-0D83CD?style=for-the-badge&logo=javascript&logoColor=white)
![React Konva](https://img.shields.io/badge/React_Konva-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Jotai](https://img.shields.io/badge/Jotai-000000?style=for-the-badge&logo=react&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=socket.io&logoColor=white)

### Tools
![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)

## Quick Start

```bash
# Clone and setup
git clone https://github.com/dotbillu/Scrib-draw.git
cd Scrib-draw
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Commands

```bash
pnpm install    # Install dependencies
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm lint       # Check code quality
```

## Project Structure

```
scrib-draw/
├── apps/
│   ├── web/           # Next.js frontend
│   └── ws-backend/    # WebSocket server
└── packages/
    ├── ui/            # Shared UI components
    ├── backend-common/# Backend utilities
    ├── eslint-config/ # ESLint configuration
    └── typescript-config/ # TypeScript configuration
```

## License

MIT License - see [LICENSE](https://github.com/dotbillu/Scrib-draw?tab=MIT-1-ov-file) file for details.
