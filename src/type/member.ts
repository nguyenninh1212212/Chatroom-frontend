import { UserInfo } from "./user";

export interface IMembersInfo {
  id: string;
  userInfo: UserInfo;
}

export interface ListMembers {
  message: string;
  data: IMembersInfo[];
}
