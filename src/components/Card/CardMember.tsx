import React from "react";
import { icons } from "../../constanst";
import { MembersInfo } from "../../type/member";

interface CardMemberProps {
  data: MembersInfo;
}
const CardMember: React.FC<CardMemberProps> = ({ data }) => {
  const { user } = data;
  return (
    <div className="flex gap-2 mt-3">
      <img src={icons.User} className="w-10 h-10" alt="" />
      <div>
        <p className="font-bold">{user.fullname}</p>
        <p className="text-xs">{user.email}</p>
      </div>
    </div>
  );
};

export default CardMember;
