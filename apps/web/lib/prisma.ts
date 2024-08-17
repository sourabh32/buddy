// src/prismaClient.ts
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

declare global {
  // Prevent multiple instances of PrismaClient in development mode
  var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === 'production') {
  // In production, use a new PrismaClient instance
  prisma = new PrismaClient();
} else {
  // In development, use a global variable so the client is not recreated on every hot reload
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
