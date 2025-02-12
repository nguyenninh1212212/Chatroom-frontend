import { UserInfo } from "./user";

export interface message {
  content: string;
  user: UserInfo;
  created: string;
  isMine: boolean;
}

export interface sendMessage {
  user_id: string;
  content: string;
}
