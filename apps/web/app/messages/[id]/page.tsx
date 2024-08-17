import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../../lib/auth'
 

const fetchChat = async ({recipient}:{recipient:string}) => {
  // Make API call to fetch chat between the current user and the recipient
}
const page = async ({params}:{params:{id:string}}) => {
    const session = await getServerSession(authOptions)
    const chat = await fetchChat({recipient:params.id})
  return (
    <div>page {params.id}</div>
  )
}

export default page