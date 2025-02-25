import React from "react";
import {
  getTailwindBgColor,
  getFirstLetterOfLastWord,
} from "../../util/BgColorAlpha";

const CardSearch = ({
  name,
  fullname,
  friend,
}: {
  name: string;
  fullname: string;
  friend: boolean;
}) => {
  console.log("🚀 ~ isFriend:", friend);
  return (
    <button className="mt-1 hover:bg-stone-300 p-3  w-full rounded-xl">
      <div className="flex gap-4 items-center">
        <div
          className={`${getTailwindBgColor(
            name || fullname
          )} w-12 h-12 rounded-full items-center justify-center flex`}
        >
          <p className="text-xl text-white">
            {" "}
            {getFirstLetterOfLastWord(name || fullname)}
          </p>
        </div>
        <div className="flex flex-col items-start">
          <p className="font-bold text-black">{name || fullname}</p>
        </div>
      </div>
    </button>
  );
};

export default CardSearch;
