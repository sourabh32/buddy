"use client"
import React from 'react'
// import { createConversation } from 
import { useRouter } from 'next/navigation'
import { Send } from 'lucide-react'
import { createConversation } from '../../actions/chat.actions'
const CreateChat = ({recipientId}:{recipientId:string}) => {
 const router = useRouter()
  const handleConversation = async () =>{
    console.log("click teh ",recipientId)

     const res =  await createConversation({recipientId})

     router.push(`/messages/${res}`)
  }
  return (
    <button onClick={handleConversation} className="btn w-full sm:w-fit btn-md btn-primary ">Chat with Owner <Send /></button>
  )
}

export default CreateChat