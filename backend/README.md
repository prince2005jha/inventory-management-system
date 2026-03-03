# Inventory Backend

This directory contains a simple Node.js + Express backend for the inventory management system.

Quick start:

- copy `.env.example` to `.env` and edit the values
- install dependencies: `npm install`
- start dev server: `npm run dev`

Docker
------

Build and run using Docker Compose (app + MongoDB):

```bash
docker compose up -d --build
```

The API will be available at `http://localhost:3000` (unless you change the port).

To stop and remove containers:

```bash
docker compose down
```

