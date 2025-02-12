import api from ".";
import { listRoom } from "../type/room";

export const getRooms = async (user_id: string): Promise<listRoom> => {
  const res = await api.get<listRoom>("/room", { params: { user_id } });
  return res.data;
};
