import React from "react";
import { icons } from "../../constanst";
import { IMembersInfo } from "../../type/member";
import {
  getTailwindBgColor,
  getFirstLetterOfLastWord,
} from "../../util/BgColorAlpha";

interface CardMemberProps {
  data: IMembersInfo;
}
const CardMember: React.FC<CardMemberProps> = ({ data }) => {
  const { userInfo } = data;
  console.log(userInfo);

  return (
    <div className="flex gap-2 mt-3">
      <div
        className={`${getTailwindBgColor(
          userInfo.fullName || ""
        )} w-12 h-12 rounded-full items-center justify-center flex`}
      >
        <p className="text-xl">
          {" "}
          {getFirstLetterOfLastWord(userInfo.fullName || "")}
        </p>
      </div>
      <div className="flex flex-col">
        <p className="font-bold line-clamp-1">{userInfo.fullName}</p>
        <p className="text-xs line-clamp-1">{userInfo.email}</p>
      </div>
    </div>
  );
};

export default CardMember;
