import React from "react";
import { IMessageInfo } from "../../type/message";
import { formatDate } from "../../util/formatDate";
import {
  getFirstLetterOfLastWord,
  getTailwindBgColor,
} from "../../util/BgColorAlpha";

interface IMessageCard {
  data: IMessageInfo;
  myEmail: string;
}
const IsMyMess: React.FC<IMessageCard> = ({ data, myEmail }) => {
  const { content, created, email, sender } = data;
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
            className={`p-2  shadow-md max-w-xs break-words text-white ${
              mine
                ? `${getTailwindBgColor(sender)} rounded-tl-2xl rounded-b-2xl`
                : "bg-stone-400 rounded-tr-2xl rounded-b-2xl"
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

export default IsMyMess;
