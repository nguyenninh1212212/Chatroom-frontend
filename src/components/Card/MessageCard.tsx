import React from "react";

const MessageCard = ({
  content,
  created,
  isMine,
}: {
  content: string;
  created: string;
  isMine: boolean;
}) => {
  return (
    <div
      className={`flex flex-col gap-1 ${isMine ? "items-end" : "items-start"}`}
    >
      <p
        className={`p-2 rounded-lg shadow-md max-w-xs break-words text-white ${
          isMine ? "bg-blue-500 " : "bg-stone-400"
        }`}
      >
        {content}
      </p>
      <p className="text-xs text-gray-400">{created}</p>
    </div>
  );
};

export default MessageCard;
