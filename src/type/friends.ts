import { UserInfo } from "./user";

export interface IFriend {
  id: string;
  user: UserInfo;
  created: string;
  status: string;
}

export interface IListFriends {
  message: string;
  data: IFriend[];
}

export interface IInvitaion {
  id: string;
  isMe: boolean;
  sender: UserInfo;
  receiver: UserInfo;
  status: string;
}

export interface IListInvitaion {
  message: string;
  data: IInvitaion[];
}
