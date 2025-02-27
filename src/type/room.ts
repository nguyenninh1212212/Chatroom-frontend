import { IMembersInfo } from "./member";
import { IMessageInfo } from "./message";
import { IUserFE, UserInfo } from "./user";

export interface page {
  data: IRoomInfo[];
  page: number;
  size: number;
  totalPages: number;
}

export interface IRoomInfo {
  id: string;
  name: string;
  owner: UserInfo;
  latestMessage: string;
}
// export interface ITheRoomDetail {
//   id: string;
//   name: string;
//   member: IMembersInfo[];
//   message: IMessageInfo[];
// }

export interface IListRoom {
  message: string;
  data: page;
}

export interface IRoomDetail {
  id: string;
  name: string;
  owner: IUserFE;
  members: IMembersInfo[];
  messages: IMessageInfo[];
}

export interface ITheRoom {
  message: string;
  data: IRoomDetail;
}
