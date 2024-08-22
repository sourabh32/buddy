import Link from "next/link";
import Image from "next/image";

const ChatListItem = ({ conversation }) => {
  const { id, name, oppositeUser } = conversation;

  return (
      <div className="flex items-center p-4 border-b border-gray-300">

        <Image
            src={oppositeUser?.image || '/default-profile.png'}
            alt={oppositeUser?.name}
            width={50}
            height={50}
            className="rounded-full"
        />

        <div className="ml-4">
          <h4 className="text-lg font-semibold">{oppositeUser?.name}</h4>
          <p className="text-sm text-gray-500">{name}</p>
        </div>

        <div className="ml-auto">
          <Link href={`/messages/${id}`} passHref>
            <span className="text-blue-500 hover:text-blue-700">View Messages</span>
          </Link>
        </div>
      </div>
  );
};
export default ChatListItem;