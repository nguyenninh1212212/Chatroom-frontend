import api from ".";
import { IAcTheRoom, IListRoom, ITheRoom } from "../type/room";

export const getRooms = async (user_id: string): Promise<IListRoom> => {
  const res = await api.get<IListRoom>("/room", { params: { user_id } });
  return res.data;
};
export const getTheRoom = async (
  user_id: string,
  room_id: string
): Promise<ITheRoom> => {
  const res = await api.get<ITheRoom>("/room/detail", {
    params: { user_id, room_id },
  });
  return res.data;
};

export const joinTheRoom = async (room_id: string, user_id: string) => {
  const res = await api.post<IAcTheRoom>("/room/join", {
    room_id,
    user_id,
  });
  return res.data;
};

export const leaveTheRoom = async (room_id: string) => {
  const res = await api.post<IAcTheRoom>("/room/leave", {
    room_id,
  });
  return res.data;
};
export const searchRoom = async (keyword: string): Promise<IListRoom> => {
  const res = await api.get<IListRoom>("/room/search", { params: { keyword } });
  return res.data;
};
