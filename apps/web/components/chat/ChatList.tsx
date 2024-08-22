"use client"

import { useSession } from "next-auth/react";
import { useState } from "react";

  
  import ChatListItem from "./ChatListItem"
  
  const ChatList = ({conversations}) => {
    const {data:session} = useSession()
    const [selectedChat, setSelectedChat] = useState(null);

  // Example chat data
  // const chats = [
  //   { id: 1, name: 'John Doe' },
  //   { id: 2, name: 'Jane Smith' },
  //   { id: 3, name: 'Alice Johnson' },
  // ];
  
    return (
      <div className="w-1/3 bg-base-100 border-r p-4 overflow-y-auto">
      
       
        {
          conversations?.length>0 && conversations.map((conversation) => (
              <ChatListItem key={conversation.id} conversation={conversation} />

            // <ChatListItem key={conversation.id} id={conversation.id} name={ conversation?.recipient?.id !== session?.user?.id ? conversation?.recipient?.name : conversation?.owner?.name } image={ conversation?.recipient?.id !== session?.user?.id ? conversation?.recipient?.image : conversation?.owner?.image} unseenCount={conversation.unseenCount}/>
          ))
        
          }
      
      </div>
    );
  };

  export default ChatList







