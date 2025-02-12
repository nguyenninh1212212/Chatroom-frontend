import { UserInfo } from "./user";

export interface MembersInfo {
  id: string;
  user: UserInfo;
}

export interface ListMembers {
  message: string;
  data: MembersInfo[];
}
