// "use client";

// import { useSession } from "next-auth/react";
// import { sendMessage, getMessagesForConversation, markMessagesAsSeen } from "../../actions/chat.actions";
// import { useEffect, useState, useRef } from "react";
// import { CheckCheck } from "lucide-react";

// const ChatWindow = ({ messageHistory, conversationId }) => {
//   const { data: session, status } = useSession();
//   const [messages, setMessages] = useState(messageHistory);
//   const [newMessage, setNewMessage] = useState("");
//   const lastMessageRef = useRef(null);

//   useEffect(() => {
//     // Automatically scroll to the last message when messages change
//     if (lastMessageRef.current) {
//       lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
//     }

//     // Trigger mark messages as seen API when conversation opens or refreshes
//     const markMessages = async () => {
//       await markMessagesAsSeen(conversationId, session?.user.id);
//     };
//     markMessages();
//   }, [messages, conversationId]);

//   const handleRefresh = async () => {
//     const refreshedMessages = await getMessagesForConversation(conversationId);
//     setMessages(refreshedMessages);
//   };

//   const handleSendMessage = async () => {
//     if (newMessage.trim()) {
//       const newMessages = await sendMessage(conversationId, session.user.id, newMessage);
//       setMessages([...messages, newMessages]);
//       setNewMessage("");
//     }
//   };

//   return (
//     <div data-theme="dim" className="w-2/3 flex flex-col bg-base-200 p-4">
//       {conversationId || session?.user?.id ? (
//         <>
//           <div className="flex-1 overflow-y-auto mb-4 border border-base-100 bg-base-100 rounded-lg p-4">
//             {messages?.length > 0 &&
//               messages.map((message, index) => (
//                 <div
//                   key={message.id}
//                   className={`mb-3 flex ${
//                     message.senderId === session?.user?.id ? "justify-end" : "justify-start"
//                   }`}
//                   ref={index === messages.length - 1 ? lastMessageRef : null} // Attach ref to the last message
//                 >
//                   <div
//                     className={`p-2 rounded-lg ${
//                       message.senderId === session?.user?.id
//                         ? "bg-green-100 text-black"
//                         : "bg-blue-100 text-black"
//                     }`}
//                   >
//                     <div className="font-normal flex gap-2 mt-1">
//                       {message.content}
//                       {message.senderId === session?.user?.id && (
//                         <CheckCheck className={`${message.isSeen ? "text-green-700" : "text-gray-400"}`} />
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>

//           <div className="flex mb-20 items-center border-t text-text-p pt-2">
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               className="flex-1 input input-sm px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
//               placeholder="Type a message..."
//             />
//             <button
//               onClick={handleSendMessage}
//               className="ml-2 px-4 py-2 bg-primary text-black rounded-lg"
//             >
//               Send
//             </button>
//             {/* <button
//               onClick={handleRefresh}
//               className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
//             >
//               Refresh
//             </button> */}
//           </div>
        


//         </>
//       ) : (
//         <div className="flex-1 flex items-center justify-center text-gray-500">
//           <p>Select a chat to start messaging</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatWindow;
"use client"
import React, {useEffect, useState,useRef} from 'react';
import {useSocket} from "../../providers/SocketProvider";
import {useSession} from "next-auth/react";


interface ChatWindowProps {
  initialMessages: string[];

  conversationId: string;

}function extractTimeFromISOString(isoString) {
  const date = new Date(isoString);
  return date.toTimeString().slice(0, 5);
}

const ChatWindow: React.FC<ChatWindowProps> = ({ initialMessages, conversationId }) => {
  const { joinConversation, messages, sendMessage } = useSocket()
  const [message, setMessage] = useState('');
  const allMessages = [...initialMessages,...messages];
  const session = useSession()
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const handleSendMessage = () => {
    if (message.trim() && session) {
      sendMessage({ conversationId, message,senderId:session?.data?.user?.id });
      setMessage(''); // Clear the input field after sending
      inputRef.current.focus(); //
    }
  };


  useEffect(() => {
    inputRef.current.focus();
  }, []);
  useEffect(() => {
    joinConversation({ conversationId })
  }, [conversationId, joinConversation])
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  return (
    <div className="flex flex-col h-full w-full bg-base-200 p-4 rounded-lg shadow-lg">
      {/*{JSON.stringify(allMessages)}*/}
      <div className="flex-grow overflow-y-auto p-4 space-y-2 bg-base-100 rounded-lg shadow-inner">
        { session &&  allMessages.map((msg, index) => (
            <div key={index} className={`chat ${msg.senderId === session?.data?.user.id ? 'chat-end' : 'chat-start'}`}>
              <div
                  className={`chat-bubble flex flex-col gap-1 ${msg.senderId === session?.data?.user.id ? 'chat-bubble-primary' : 'chat-bubble-accent'}`}>
                <div>
                  {msg.content}
                </div>
                <div className="flex justify-between items-center">
                  {msg.createdAt && (
                      <span className="text-sm text-base-200">
          {extractTimeFromISOString(msg.createdAt)}
        </span>
                  )}

                  {/* Display "Read" status only for received messages */}
                  {msg.senderId !== session?.data?.user.id  && (
                      <span className="text-xs text-base-200">
          Read
        </span>
                  )}
                </div>
              </div>
            </div>

        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Message Input */}
      <div className="mt-4 flex items-center">
        <input
            ref={inputRef}
            type="text"
            className="input input-bordered flex-grow"
            placeholder="Type your message..."
            value={message}
            disabled={!session}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
            className="btn btn-primary ml-2"
            onClick={() => {
              handleSendMessage()
            }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

