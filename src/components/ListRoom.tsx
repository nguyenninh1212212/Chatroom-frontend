import React, { useState, useMemo, useEffect } from "react";
import PopupUser from "./PopupUser";
import { SwitchButton } from "./Button/SwitchButton";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/user";
import { UserInfo } from "../type/user";
import { useParams } from "react-router-dom";
import { decodeToken } from "../api";
import {
  getFirstLetterOfLastWord,
  getTailwindBgColor,
} from "../util/BgColorAlpha";
import Chats from "./List/Chats";
import Friends from "./List/Friends";
import Invitation from "./List/Intvitation/Invitation";
import { search } from "../api/search";
import CardSearch from "./Card/CardSearch";
import DiagramLayout from "../util/Diagram/DiagramLayout";
import CreateRoomScreen from "../util/Diagram/CreateRoomScreen";

const ListRooms = () => {
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showDiagram, setShowDiagram] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [debouncedKeyword, setDebouncedKeyword] = useState<string>("");
  const valueToSwitch = ["Chat", "Friends", "Invitation"];
  const [status, setStatus] = useState("Chat");

  const switchList = [
    {
      status: "Chat",
      component: (
        <Chats setShowDiagram={setShowDiagram} showDiagram={showDiagram} />
      ),
    },
    {
      status: "Friends",
      component: <Friends user_id={decodeToken()?.sub2 || ""} />,
    },
    { status: "Invitation", component: <Invitation /> },
  ];

  const togglePopup = () => setShowPopup(!showPopup);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);
    return () => clearTimeout(handler);
  }, [keyword]);

  // Fetch thông tin user
  const { data: info, isLoading: loadingInfo } = useQuery({
    queryKey: ["infoUser"],
    queryFn: () => getUser(decodeToken()?.sub || "", decodeToken()?.sub4 || ""),
  });

  const { data: searchResults, isLoading: loadingSearch } = useQuery({
    queryKey: ["searchRoom", debouncedKeyword],
    queryFn: () =>
      debouncedKeyword ? search(debouncedKeyword) : Promise.resolve([]),
    enabled: !!debouncedKeyword,
    staleTime: 10000, // 10 giây trước khi fetch lại
  });

  const resSearch = [
    ...(searchResults?.user || ""),
    ...(searchResults?.room || ""),
  ];

  // Ghi nhớ thông tin người dùng
  const memoizedUser: UserInfo = useMemo(
    () => ({
      id: "",
      fullName: "",
      email: "",
      created: "",
      updated: "",
      update: info?.data.update || "",
      ...info?.data,
    }),
    [info]
  );

  return (
    <div className="h-auto bg-white w-[30%] rounded-lg flex flex-col overflow-hidden line-clamp-6 border border-stone-400">
      {/* Header - Phần cố định */}
      <div
        className="flex items-center bg-blue-500 p-4 cursor-pointer  "
        onClick={togglePopup}
      >
        <div
          className={`${getTailwindBgColor(
            info?.data.fullname || ""
          )} rounded-full h-16 w-16 flex items-center justify-center border`}
        >
          <p className="text-3xl">
            {getFirstLetterOfLastWord(info?.data.fullname || "")}
          </p>
        </div>
        <div className="ml-2">
          <p className="font-bold text-xl text-white ">
            {loadingInfo ? "Loading..." : memoizedUser.fullname || "Unknown"}
          </p>
          <p className="text-xs text-green-400 font-bold">Online</p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="p-3">
        <div className="flex gap-2">
          {isFocused && (
            <button
              onClick={() => setIsFocused(false)}
              className="text-black text-2xl"
            >
              👈
            </button>
          )}
          <input
            type="text"
            placeholder="Search to join the chat!"
            className="p-3 w-full rounded-3xl border border-gray-500 bg-stone-200 text-black"
            onFocus={() => setIsFocused(true)}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        {/* Chỉ hiển thị filter nếu không focus vào ô tìm kiếm */}
        {!isFocused && (
          <SwitchButton
            firstButton={"Chat"}
            value={valueToSwitch}
            background={{ target: "bg-blue-600", untarget: "bg-blue-300" }}
            text={{ target: "text-white", untarget: "text-white" }}
            setStatus={setStatus}
          />
        )}
      </div>

      <div className="flex-1 min-h-0 overflow-auto p-4">
        {isFocused ? (
          <div className="sticky h-1/2 w-full left-0 right-0 mt-2 bg-white border-gray-400 shadow-xl border rounded-lg p-2 text-black overflow-y-auto">
            <p className="text-gray-500">Gợi ý tìm kiếm...</p>
            <ul>
              {loadingSearch ? (
                <p>Đang tìm kiếm...</p>
              ) : resSearch.length > 0 ? (
                resSearch.map((e: any, _i: number) => (
                  <li key={e.id}>
                    <CardSearch
                      fullname={e.fullname}
                      name={e.name}
                      friend={e.friend}
                    />
                  </li>
                ))
              ) : (
                <p className="text-gray-400">Không tìm thấy kết quả nào.</p>
              )}
            </ul>
          </div>
        ) : (
          <>
            {switchList.find((e) => e.status === status)?.component || (
              <p className="text-red-500 text-center">No result</p>
            )}
          </>
        )}
      </div>

      {showPopup && <PopupUser togglePopup={togglePopup} data={memoizedUser} />}
      {showDiagram && (
        <DiagramLayout
          component={
            <CreateRoomScreen
              setShowDiagram={setShowDiagram}
              showDiagram={showDiagram}
            />
          }
          setShowgram={setShowDiagram}
          showgram={showDiagram}
        />
      )}
    </div>
  );
};

export default ListRooms;
