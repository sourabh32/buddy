"use client"
import React from 'react'
// import { createConversation } from 
import { useRouter } from 'next/navigation'
import { Send } from 'lucide-react'
const CreateChat = ({recipientId}) => {
 const router = useRouter()
  const handleConversation = async () =>{
    console.log("click")
  //  const res =  await createConversation(recipientId)
  //  router.push(`/conversation/${res}`)
  //  console.log(res)
  }
  return (
    <button onClick={handleConversation} className="btn w-full sm:w-fit btn-md btn-primary ">Chat with Owner <Send /></button>
  )
}

export default CreateChat