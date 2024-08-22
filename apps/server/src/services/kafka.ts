import { Kafka, Producer, Consumer } from "kafkajs";
import fs from "fs";
import path from "path";
import prisma from "./prisma";
import dotev from "dotenv"
dotev.config()
const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER || ""],
  ssl: {
    ca: [fs.readFileSync(path.resolve("ca.pem"), "utf-8")],
  },
  sasl: {
    username: process.env.KAFKA_USER || "",
    password: process.env.KAFKA_PASSWORD || "",
    mechanism: "plain",
  },
});

let producer: Producer | null = null;

export async function createProducer(): Promise<Producer> {
  if (producer) return producer;

  const _producer = kafka.producer();
  await _producer.connect();
  producer = _producer;
  return producer;
}

export async function produceMessage(message: any): Promise<boolean> {
  const producer = await createProducer();
  await producer.send({
    messages: [{ key: `message-${Date.now()}`, value: JSON.stringify(message) }],
    topic: "MESSAGES",
  });
  return true;
}

export async function startMessageConsumer() {
  console.log("Consumer is running..");
  const consumer = kafka.consumer({ groupId: "default" });
  await consumer.connect();
  await consumer.subscribe({ topic: "MESSAGES", fromBeginning: true });

  await consumer.run({
    autoCommit: true,
    eachMessage: async ({ message, pause }) => {
      if (!message.value) return;
      console.log(`New Message Recv..`);
      try {
        const parsedMessage = JSON.parse(message.value.toString());
         console.log(parsedMessage)
       if (parsedMessage.event === 'read'){
         await prisma.message.update({
           where:{id:parsedMessage.messageId},
           data:{
             read:true
           }
         })
       }
        await prisma.message.create({
          data: {
            content: parsedMessage.message,  // Updated field name
            conversationId: parsedMessage.conversationId,
            senderId: parsedMessage.senderId, // Assuming the sender ID is part of the message
            // Add more fields here based on your Prisma schema
          },
        });
      } catch (err) {
        console.log("Something went wrong", err);
        pause();
        setTimeout(() => {
          consumer.resume([{ topic: "MESSAGES" }]);
        }, 60 * 1000);
      }
    },
  });
}

export default kafka;
