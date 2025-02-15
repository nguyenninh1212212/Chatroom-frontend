import React, { useState, useMemo, useEffect } from "react";
import { icons } from "../constanst";
import PopupUser from "./PopupUser";
import { SwitchButton } from "./Button/SwitchButton";
import { useQuery } from "@tanstack/react-query";
import { getRooms, searchRoom } from "../api/room";
import CardRoom from "./Card/CardRoom";
import { getUser } from "../api/user";
import { UserInfo } from "../type/user";
import { Link, useParams } from "react-router-dom";
import { decodeToken } from "../api";

const ListRooms = () => {
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [debouncedKeyword, setDebouncedKeyword] = useState<string>(""); // Từ khóa có debounce
  const valueToSwitch = ["All", "Private", "Public"];
  const [status, setStatus] = useState("All");

  const togglePopup = () => setShowPopup(!showPopup);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);
    return () => clearTimeout(handler);
  }, [keyword]);

  // Fetch danh sách phòng
  const { data, isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => getRooms(decodeToken()?.sub2),
  });
  console.log("🚀 ~ ListRooms ~ decodeToken()?.sub2:", decodeToken()?.sub);

  // Fetch thông tin user
  const { data: info, isLoading: loadingInfo } = useQuery({
    queryKey: ["infoUser"],
    queryFn: () => getUser(decodeToken()?.sub),
  });

  // Fetch tìm kiếm phòng (chỉ gọi API khi có `debouncedKeyword`)
  const { data: searchResults, isLoading: loadingSearch } = useQuery({
    queryKey: ["searchRoom", debouncedKeyword],
    queryFn: () => searchRoom(debouncedKeyword),
    enabled: !!debouncedKeyword, // Chỉ fetch khi có từ khóa
  });

  console.log("🚀 ~ ListRooms ~ searchResults:", searchResults);

  // Ghi nhớ danh sách phòng
  const memoizedRooms = useMemo(() => data?.data || [], [data]);

  // Ghi nhớ thông tin người dùng
  const memoizedUser: UserInfo = useMemo(() => info?.data || {}, [info]);

  if (!data) return <p>No data</p>;

  return (
    <div className="h-auto bg-gray-200 w-[30%] rounded-lg flex flex-col overflow-hidden ">
      {/* Header - Phần cố định */}
      <div
        className="flex items-center bg-blue-500 p-4 cursor-pointer"
        onClick={togglePopup}
      >
        <img src={icons.User} alt="" className="h-14 w-14" />
        <div className="ml-2">
          <p className="font-bold text-xl text-white">
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
            className="p-3 w-full rounded-3xl border border-gray-500 text-black"
            onFocus={() => setIsFocused(true)}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        {/* Chỉ hiển thị filter nếu không focus vào ô tìm kiếm */}
        {!isFocused && (
          <SwitchButton
            firstButton={"All"}
            value={valueToSwitch}
            background={{ target: "bg-blue-600", untarget: "bg-blue-300" }}
            text={{ target: "text-white", untarget: "text-white" }}
            setStatus={setStatus}
          />
        )}
      </div>

      {/* Danh sách phòng */}
      <div className="flex-1 min-h-0 overflow-auto p-4">
        {isLoading ? (
          <center>
            <p>Loading...</p>
          </center>
        ) : isFocused ? (
          <div className="sticky h-full w-full left-0 right-0 mt-2 bg-white border-gray-400 shadow-xl border rounded-lg p-2 text-black">
            <p className="text-gray-500">Gợi ý tìm kiếm...</p>
            <ul>
              {loadingSearch ? (
                <p>Đang tìm kiếm...</p>
              ) : searchResults?.data?.length > 0 ? (
                searchResults.data.map((e: any, _i: number) => (
                  <li key={e.id}>
                    <Link
                      to={`/room/${e.id}`}
                      className="block p-2 hover:bg-stone-300 cursor-pointer"
                      onClick={() => setIsFocused(false)}
                    >
                      <CardRoom key={_i} data={e} target={""} />
                    </Link>
                  </li>
                ))
              ) : (
                <p className="text-gray-400">Không tìm thấy kết quả nào.</p>
              )}
            </ul>
          </div>
        ) : (
          memoizedRooms.map((e, _i) => (
            <CardRoom key={_i} data={e} target={id} />
          ))
        )}
      </div>

      {showPopup && <PopupUser togglePopup={togglePopup} data={memoizedUser} />}
    </div>
  );
};

export default ListRooms;
