import Link from 'next/link';
import React from 'react';

const ChatListItem = ({ name,image, id,unseenCount }) => {
  

  return (
    <Link href={`/conversation/${id}`}>
    <div
    className="flex items-center p-4 cursor-pointer bg-secondary hover:opacity-90 rounded-lg"
    
  >
    <img
      src={image}
      alt={name}
      className="w-12 h-12 rounded-full object-cover mr-4"
    />
    <div className="flex-1">
      <h3 className="text-lg font-semibold">{name}</h3>
     
      {unseenCount  && (
        <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 ml-2">
          {unseenCount}
        </span>
      )}
    </div>
  </div>
  </Link>
  );
};

export default ChatListItem;
