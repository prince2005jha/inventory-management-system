const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

// Basic health route
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Attach io to app for routes to use
app.set('io', io);

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('New client connected', socket.id);
  socket.on('disconnect', () => console.log('Client disconnected', socket.id));
});

// Routes
const inventoryRouter = require('./routes/inventory');
const authRouter = require('./routes/auth');
const authMiddleware = require('./middleware/auth');

app.use('/api/auth', authRouter);
// protect inventory endpoints (require auth for all inventory routes)
app.use('/api/inventory', authMiddleware, inventoryRouter);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/inventorydb';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });

module.exports = { app, server, io };
