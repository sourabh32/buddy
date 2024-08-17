"use client";

import { useSession } from "next-auth/react";
import { sendMessage, getMessagesForConversation, markMessagesAsSeen } from "../../actions/chat.actions";
import { useEffect, useState, useRef } from "react";
import { CheckCheck } from "lucide-react";

const ChatWindow = ({ messageHistory, conversationId }) => {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState(messageHistory);
  const [newMessage, setNewMessage] = useState("");
  const lastMessageRef = useRef(null);

  useEffect(() => {
    // Automatically scroll to the last message when messages change
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }

    // Trigger mark messages as seen API when conversation opens or refreshes
    const markMessages = async () => {
      await markMessagesAsSeen(conversationId, session?.user.id);
    };
    markMessages();
  }, [messages, conversationId]);

  const handleRefresh = async () => {
    const refreshedMessages = await getMessagesForConversation(conversationId);
    setMessages(refreshedMessages);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const newMessages = await sendMessage(conversationId, session.user.id, newMessage);
      setMessages([...messages, newMessages]);
      setNewMessage("");
    }
  };

  return (
    <div className="w-2/3 flex flex-col bg-primary p-4">
      {conversationId || session?.user?.id ? (
        <>
          <div className="flex-1 overflow-y-auto mb-4 border border-base-100 bg-base-100 rounded-lg p-4">
            {messages?.length > 0 &&
              messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`mb-3 flex ${
                    message.senderId === session?.user?.id ? "justify-end" : "justify-start"
                  }`}
                  ref={index === messages.length - 1 ? lastMessageRef : null} // Attach ref to the last message
                >
                  <div
                    className={`p-2 rounded-lg ${
                      message.senderId === session?.user?.id
                        ? "bg-green-100 text-black"
                        : "bg-blue-100 text-black"
                    }`}
                  >
                    <div className="font-normal flex gap-2 mt-1">
                      {message.content}
                      {message.senderId === session?.user?.id && (
                        <CheckCheck className={`${message.isSeen ? "text-green-700" : "text-gray-400"}`} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex mb-20 items-center border-t text-text-p pt-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 input input-sm px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 px-4 py-2 bg-secondary text-white rounded-lg"
            >
              Send
            </button>
            <button
              onClick={handleRefresh}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Refresh
            </button>
          </div>
        


        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <p>Select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
