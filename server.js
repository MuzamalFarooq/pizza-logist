const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("Client connected to Socket.io:", socket.id);

    socket.on("join_room", (orderId) => {
      socket.join(orderId);
      console.log(`Socket ${socket.id} joined room: ${orderId}`);
    });

    socket.on("status_change", ({ orderId, status }) => {
      console.log(`[Status Change] Order ${orderId} | Status: ${status}`);
      io.to(orderId).emit("order_status_updated", { orderId, status });
    });

    socket.on("send_message", ({ orderId, sender, text }) => {
      console.log(`[Message] Room ${orderId} | ${sender}: ${text}`);
      io.to(orderId).emit("receive_message", {
        sender,
        text,
        createdAt: new Date().toISOString()
      });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
