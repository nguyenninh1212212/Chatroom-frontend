import api from ".";
import { IListFriends, IListInvitaion } from "../type/friends";

export const getFriends = async (user_id: string): Promise<IListFriends> => {
  const res = await api.get<IListFriends>("/friends", { params: { user_id } });
  return res?.data;
};

export const getInvitationSender = async (
  user_id: string
): Promise<IListInvitaion> => {
  const res = await api.get<IListInvitaion>("/friends/invitation/sender", {
    params: { user_id },
  });
  return res?.data;
};

export const getInvitationReceiver = async (
  user_id: string
): Promise<IListInvitaion> => {
  const res = await api.get<IListInvitaion>("/friends/invitation/receiver", {
    params: { user_id },
  });
  return res?.data;
};

export const respondInvitationRequest = async (id: string, appect: boolean) => {
  return await api.post<IListInvitaion>("/friends/invitation/respond", {
    id,
    appect,
  });
};

export const chatWithFriend = async (email: string, friend_email: string) => {
  return await api.post("/friends/chat", { email, friend_email });
};
