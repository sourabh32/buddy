
import ChatList from "../../../components/chat/ChatList"
import {getConversations} from "../../../actions/chat.actions";
export default async function DashboardLayout({ children }:{children:React.ReactNode}) {
  const conversations = await getConversations()
  console.log("conversations",conversations)
  return    (<div className="flex h-screen bg-gray-100">
    <ChatList conversations={conversations} />
  {children}
</div>)
}