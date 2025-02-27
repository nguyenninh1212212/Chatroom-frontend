import React from "react";
import { IMessageInfo } from "../../type/message";
import { formatDate } from "../../util/formatDate";
import {
  getFirstLetterOfLastWord,
  getTailwindBgColor,
} from "../../util/BgColorAlpha";

interface IMessageCard {
  data: IMessageInfo;
}
const MessageCard: React.FC<IMessageCard> = ({ data }) => {
  const { content, created, sender, mine } = data;

  return (
    <div
      className={`flex flex-col gap-1 ${mine ? "items-end" : "items-start"}`}
    >
      <div className={`flex gap-2 ${mine ? "flex-row-reverse" : ""}`}>
        {!mine && (
          <div
            className={`${getTailwindBgColor(
              sender || ""
            )} rounded-full h-10 w-10 flex items-center justify-center mt-6 relative bottom-5`}
          >
            <p className="text-xl">{getFirstLetterOfLastWord(sender || "")}</p>
          </div>
        )}
        <div>
          {!mine && <p className="text-stone-500 text-xs pb-1">{sender}</p>}
          <p
            className={`p-2  shadow-md max-w-xs break-words text-white ${
              mine
                ? `${getTailwindBgColor(sender)} rounded-b-2xl rounded-tl-2xl`
                : "bg-stone-400 rounded-b-2xl rounded-tr-2xl"
            }`}
          >
            {content}
          </p>
          <p className="text-xs text-gray-400">
            {formatDate(created)?.HourFormat12}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
