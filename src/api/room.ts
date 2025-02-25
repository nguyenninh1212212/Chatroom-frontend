import api from ".";
import { IListRoom, ITheRoom } from "../type/room";

export const getRooms = async (
  user_id: string,
  size: number,
  page: number
): Promise<IListRoom> => {
  const res = await api.get<IListRoom>("/room", {
    params: { user_id, page, size },
  });
  return res.data;
};
export const getTheRoom = async (
  user_id: string,
  room_id: string,
  page: number
): Promise<ITheRoom> => {
  const res = await api.get<ITheRoom>("/room/detail", {
    params: { room_id, user_id, page },
  });
  return res.data;
};

export const joinTheRoom = async (room_id: string, user_id: string) => {
  const res = await api.post<ITheRoom>("/room/join", {
    room_id,
    user_id,
  });
  return res.data;
};

export const leaveTheRoom = async (room_id: string) => {
  const res = await api.post<ITheRoom>("/room/leave", {
    room_id,
  });
  return res.data;
};

export const createRoom = async (user_id: string, name: string) => {
  const res = await api.post<ITheRoom>("/room/cre", {
    user_id,
    name,
  });
  return res.data;
};
