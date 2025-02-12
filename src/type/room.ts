import { UserInfo } from "./user";

export interface roomInfo {
  id: string;
  name: string;
  owner: UserInfo;
  latestMessage: string;
}

export interface listRoom {
  message: string;
  data: roomInfo[];
}
