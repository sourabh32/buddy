"use server"
import prisma from "../lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../utils/auth";

export const getUserById = async ({id}:{id:string}) =>{
    try {
        const user = await prisma.user.findUnique({
            where:{
                id
            },
            include:{
                
                courses:true
            }
        
        });
        return user;
    } catch (error) {
      console.error('Error fetching user:', error);
        
    }
}