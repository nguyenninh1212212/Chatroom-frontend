import React, { useState } from "react";
import { icons } from "../constanst";
// import CardRoom from "./Card/CardRoom";
import PopupUser from "./PopupUser";
import { SwitchButton } from "./Button/SwitchButton";
import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../api/room";
import CardRoom from "./Card/CardRoom";
const ListRooms = () => {
  const [showPopup, setShowPopup] = useState(false);
  const valueToSwitch = ["All", "Private", "Public"];
  const [status, setStatus] = useState("All");
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => getRooms("5988825a-a54c-4639-be94-b9e7d0db718f"),
  });

  if (!data) return <p>No data</p>;

  return (
    <div className="h-auto bg-gray-200 w-2/5 rounded-lg flex flex-col overflow-hidden">
      {/* Header - Phần cố định */}
      <div
        className="flex items-center bg-blue-500 p-4 cursor-pointer"
        onClick={togglePopup}
      >
        <img src={icons.User} alt="" className="h-14 w-14" />
        <div className="ml-2">
          <p className="font-bold text-xl text-white">Fullname of user</p>
          <p className="text-xs text-green-400 font-bold">Online</p>
        </div>
      </div>

      <div className="p-3">
        <input
          type="text"
          placeholder="Search to in join the chat!"
          className="p-3 w-full rounded-3xl border border-gray-500 text-black"
        />
        <SwitchButton
          firstButton={"All"}
          value={valueToSwitch}
          background={{ target: "bg-blue-600", untarget: "bg-blue-300" }}
          text={{ target: "text-white", untarget: "text-white" }}
          setStatus={setStatus}
        />
      </div>

      {/* Danh sách thành viên (Cuộn được) */}
      <div className="flex-1 min-h-0 overflow-auto p-4">
        {isLoading ? (
          <center>
            <p>Loading...</p>
          </center>
        ) : (
          data.data.map((e, _i) => <CardRoom key={_i} data={e} />)
        )}
      </div>

      {showPopup && <PopupUser togglePopup={togglePopup} />}
    </div>
  );
};

export default ListRooms;
