import { IRoomInfo } from "./room";
import { UserInfo } from "./user";

export interface ISearch {
  user: UserInfo[];
  room: IRoomInfo[];
}
