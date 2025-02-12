import api from ".";
import { ListMembers } from "../type/member";
import { QueryClient } from "@tanstack/react-query";

// Tạo queryClient
export const queryClient = new QueryClient();

export const getMembers = async (room_id: string): Promise<ListMembers> => {
  const response = await api.get<ListMembers>("/member", {
    params: { room_id },
  });
  return response.data;
};

export const leave = async (room_id: string, user_id: string) => {
  await api.post("/member/leave", { room_id, user_id });

  queryClient.invalidateQueries({ queryKey: ["members", room_id] });
};
