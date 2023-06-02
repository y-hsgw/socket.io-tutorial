import express from "express";
import http from "http";
import { Server } from "socket.io";

const PORT = 8080;
const app = express();
const router = express.Router();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: ["http://localhost:3000"] },
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get(
  "/",
  async (req: express.Request, res: express.Response): Promise<void> => {
    res.send("hello world");
  }
);
app.use("/", router);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("send_message", (data) => {
    console.log(data);

    io.emit("received_message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () =>
  console.log(`listening on port http://localhost:${PORT}`)
);

export default app;
