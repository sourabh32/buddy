"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { Session } from "../types";
import prisma from "../lib/prisma"
export const createConversation = async ({ recipientId }: { recipientId: string }) => {
  console.log(recipientId);

  // Fetch the session first
  const session: Session | null = await getServerSession(authOptions);
  if (session == null || !session.user.id) {
    console.error("Session or user ID is undefined.");
    return;
  }

  // Ensure the recipient is not the same as the current user
  if (session.user.id === recipientId) return;

  try {
    // Fetch the conversation after getting the session
    let conversation = await prisma.conversation.findFirst({
      where: {
        AND: [
          { users: { some: { id: session.user.id } } },
          { users: { some: { id: recipientId } } }
        ],
      },
    });

    if (!conversation) {
      // Create a new conversation if one doesn't exist
      conversation = await prisma.conversation.create({
        data: {
          name: `${session.user.name} & ${recipientId}`, // Set the conversation name
          users: {
            connect: [
              { id: session.user.id },
              { id: recipientId },
            ],
          },
        },
      });
    }

    console.log(conversation);
    return conversation.id;
  } catch (error) {
    console.error("Failed to create conversation:", error);
  }
};

  
  
  export const  getMessagesForConversation = async(conversationId:string) => {
    try {
      const messages = await prisma.message.findMany({
        where: {
          conversationId: conversationId,
        },
        select: {
          content: true,
          senderId: true,
          createdAt: true,
          read:true
        },
        
        orderBy: {
          createdAt: 'asc', // Order messages by creation time, oldest first
        },
      });
  
      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      
    } 
  }




export const getConversations = async ()=> {

  const session: Session | null = await getServerSession(authOptions);
  if (session == null || !session.user.id) {
    console.error("Session or user ID is undefined.");
    return;
  }
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        users: {
          some: {
            id: session?.user?.id,
          },
        },
      },
      include: {
        users: {
          select: {
            id: true,   // Include the user's ID (optional)
            name: true, // Include the user's name
            image: true, // Include the user's image
          },
        },

      },

    });
    const processedConversations = conversations.map(conversation => {
      // Identify the opposite user
      const oppositeUser = conversation.users.find(user => user.id !== session?.user?.id);

      return {
        id: conversation.id,
        name: conversation.name,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
        oppositeUser: {
          id: oppositeUser?.id,
          name: oppositeUser?.name,
          image: oppositeUser?.image,
        },
      };
    });

    return processedConversations;



  } catch (error) {
    console.error('Error fetching conversations:', error.message);
    throw error;
  }
}
  
  
  



  
  

  
  
  