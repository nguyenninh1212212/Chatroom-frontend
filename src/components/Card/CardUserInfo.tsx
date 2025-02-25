import React from "react";
import {
  getFirstLetterOfLastWord,
  getTailwindBgColor,
} from "../../util/BgColorAlpha";
import { IFriend } from "../../type/friends";

interface payload {
  data: IFriend;
}

const CardUserInfo: React.FC<payload> = ({ data }) => {
  const { user } = data;
  return (
    <button>
      <div className="flex gap-2 mt-3">
        <div
          className={`${getTailwindBgColor(
            user.fullname || ""
          )} w-12 h-12 rounded-full items-center justify-center flex`}
        >
          <p className="text-xl">
            {" "}
            {getFirstLetterOfLastWord(user.fullname || "")}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold line-clamp-1 text-left text-black">
            {user.fullname}
          </p>
          <p className="text-xs line-clamp-1 text-left text-stone-400">
            {user.email}
          </p>
        </div>
      </div>
    </button>
  );
};

export default CardUserInfo;
