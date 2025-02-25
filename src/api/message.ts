import api from ".";
import { IMessageList } from "../type/message";

export const getMessage = async (
  user_id: string,
  room_id: string
): Promise<IMessageList> => {
  const res = await api.get<IMessageList>("/message", {
    params: { user_id, room_id },
  });
  return res.data;
};
