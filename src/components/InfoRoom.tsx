import React, { useState } from "react";
import { icons } from "../constanst";
import { SwitchButton } from "./Button/SwitchButton";
import ListMemberInRoom from "./ListMember";
import { ITheRoom } from "../type/room";
import {
  getTailwindBgColor,
  getFirstLetterOfLastWord,
} from "../util/BgColorAlpha";

interface room {
  data: ITheRoom;
}

const InfoRoom: React.FC<room> = ({ data }) => {
  const valueToSwitch = ["All", "Online", "Offline"];
  const [status, setStatus] = useState("All");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="w-2/6 bg-blue-500 h-full flex flex-col rounded-lg overflow-hidden p-3 ">
      {/* Phần nội dung cuộn được */}
      <div className="flex-1 overflow-auto scrollbar-hide">
        <div className="w-full flex flex-col items-center gap-2 border-b pt-16 pb-6">
          <div
            className={`${getTailwindBgColor(
              data.data.name || ""
            )} w-20 h-20 border rounded-full items-center justify-center flex`}
          >
            <p className="text-3xl">
              {" "}
              {getFirstLetterOfLastWord(data.data.name || "")}
            </p>
          </div>
          <p className="flex-col flex  items-center">
            <div className="flex items-center">
              <p className="text-lg">{data?.data?.name}</p>
              <img src={icons.dot} className="w-5 h-5" alt="" />
            </div>
            <p className="text-sm ">Created by {data?.data?.owner?.fullName}</p>
          </p>
        </div>
        <div className="overflow-hidden flex flex-col items-center align-middle p-4 gap-2">
          <div className="w-full h-auto min-h-[100px]">
            <p className="font-bold">Media</p>
            <div className="h-10">
              <p className="text-sm text-gray-100">
                Opps! There is no media in this room
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 border-t pt-4">
            {/* Dropdown List Member */}
            <div className="w-full">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full bg-blue-700 p-3 rounded-lg text-white font-bold hover:bg-blue-600"
              >
                Members
                <span>{isOpen ? "▲" : "▼"}</span>
              </button>

              {isOpen && (
                <>
                  {" "}
                  <SwitchButton
                    firstButton={"All"}
                    value={valueToSwitch}
                    background={{ target: "bg-white", untarget: "bg-blue-700" }}
                    text={{ target: "text-blue-500", untarget: "text-white" }}
                    setStatus={setStatus}
                  />
                  <div className="bg-blue-700 rounded-lg px-3 pb-3 mt-3 flex flex-col ">
                    <ListMemberInRoom data={data?.data.members} message={""} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Button "Leave" luôn ở dưới */}
      <div className="bottom-0 p-3 ">
        <button className="bg-red-500 p-3 text-lg w-full rounded-3xl hover:bg-red-300">
          Leave
        </button>
      </div>
    </div>
  );
};

export default InfoRoom;
