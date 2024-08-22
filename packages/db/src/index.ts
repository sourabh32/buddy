import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteMessagesInConversation(conversationId: string) {
  try {
    const deleteResult = await prisma.conversation.delete({
      where: {
        id: "6e7baba2-a1f4-4775-b835-b1e105695259",
      },
    });
    console.log(`Deleted messages`);
  } catch (error) {
    console.error('Error deleting messages:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Example usage
deleteMessagesInConversation('conversation-id-here');
