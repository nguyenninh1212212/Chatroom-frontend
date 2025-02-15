import React, { useState } from "react";
import { IMessageInfo } from "../../type/message";
import { formatDate } from "../../util/formatDate";
import {
  getFirstLetterOfLastWord,
  getTailwindBgColor,
} from "../../util/BgColorAlpha";
import { decodeToken } from "../../api";

interface IMessageCard {
  data: IMessageInfo;
  myEmail: string;
}
const MessageCard: React.FC<IMessageCard> = ({ data, myEmail }) => {
  const { content, created, sender, email } = data;
  const mine = myEmail === email || email == undefined;

  return (
    <div
      className={`flex flex-col gap-1 ${mine ? "items-end" : "items-start"}`}
    >
      <div className={`flex gap-2 ${mine ? "flex-row-reverse" : ""}`}>
        {!mine && (
          <div
            className={`${getTailwindBgColor(
              sender || ""
            )} rounded-full h-8 w-8 flex items-center justify-center mt-6`}
          >
            <p className="text-xl">{getFirstLetterOfLastWord(sender || "")}</p>
          </div>
        )}
        <div>
          {!mine && <p className="text-stone-500 text-xs pb-1">{sender}</p>}
          <p
            className={`p-2 rounded-lg shadow-md max-w-xs break-words text-white ${
              mine ? "bg-blue-400" : "bg-stone-300"
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
