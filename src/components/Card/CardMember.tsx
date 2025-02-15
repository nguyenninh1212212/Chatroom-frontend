import React from "react";
import { icons } from "../../constanst";
import { IMembersInfo } from "../../type/member";

interface CardMemberProps {
  data: IMembersInfo;
}
const CardMember: React.FC<CardMemberProps> = ({ data }) => {
  const { userInfo } = data;
  console.log(userInfo);

  return (
    <div className="flex gap-2 mt-3">
      <img src={icons.User} className="w-10 h-10" alt="" />
      <div className="flex flex-col">
        <p className="font-bold line-clamp-1">{userInfo.fullName}</p>
        <p className="text-xs line-clamp-1">{userInfo.email}</p>
      </div>
    </div>
  );
};

export default CardMember;
