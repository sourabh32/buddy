import Redis from "ioredis";
import { Server, Socket } from "socket.io";
import { produceMessage } from "./kafka";

const pub = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  username: process.env.REDIS_USER || undefined,
  password: process.env.REDIS_PASSWORD || undefined,

});

const sub = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  username: process.env.REDIS_USER || undefined,
  password: process.env.REDIS_PASSWORD || undefined,
});

class SocketService {
  private _io: Server;

  constructor() {
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    sub.subscribe("MESSAGES");
  }

  public initListeners() {
    const io = this.io;

    io.on("connect", (socket: Socket) => {
      console.log("scoket connected",socket.id)
      socket.on("event:join", async ({ conversationId,userId }: { conversationId: string,userId:string }) => {
        console.log(socket.id,"joined",conversationId)
        socket.join(conversationId);
        await pub.publish("MESSAGES", JSON.stringify({ event: "join", conversationId, userId }));
      });

      socket.on("event:message", async ({ conversationId, message,senderId }: { conversationId: string; message: string ,senderId:string}) => {
        await pub.publish("MESSAGES", JSON.stringify({ event: "message",senderId, conversationId, message }));
        // io.to(conversationId).emit("message", {  senderId, message,big:"jello" });
      });
      socket.on("event:read",async ({messageId}:{messageId:string}) => {

        await pub.publish("MESSAGES", JSON.stringify({ event: "read",messageId }));
      })
    });

    sub.on("message", async (channel: string, message: string) => {
      console.log("movment")
      if (channel === "MESSAGES") {
        const parsedMessage = JSON.parse(message);

        if (parsedMessage.event === "join") {
          io.to(parsedMessage.conversationId).emit("userJoined", parsedMessage.userId);
        }

        if (parsedMessage.event === "read") {

          await produceMessage(parsedMessage);
        }

        if (parsedMessage.event === "message") {
          console.log(parsedMessage)
          io.to(parsedMessage.conversationId).emit("message", { senderId: parsedMessage.senderId, content: parsedMessage.message});
          await produceMessage(parsedMessage);
        }
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
