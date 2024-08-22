import { getServerSession } from 'next-auth'
import React from 'react'

import ChatWindow from "../../../components/chat/ChatWindow"
import { getMessagesForConversation } from '../../../actions/chat.actions'



const PageContent = async ({ params }: { params: { id: string } }) => {
    // const session = await getServerSession(authOptions)
    const messageHistory = await getMessagesForConversation(params.id)

    return (
        
            <ChatWindowWrapper messageHistory={messageHistory} conversationId={params.id} />
        
    )
}

const ChatWindowWrapper: React.FC<{ messageHistory: string[], conversationId: string }> = ({ messageHistory, conversationId }) => {




    return (
        <ChatWindow
            initialMessages={messageHistory}

            conversationId={conversationId}
        />
    )
}

export default PageContent
