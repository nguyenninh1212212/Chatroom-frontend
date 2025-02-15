export interface IMessageInfo {
  content: string;
  created: string;
  mine: boolean;
  sender: string;
  email: string;
}

export interface IMessage {
  user_id: string;
  room_id: string;
  content: string;
  created: string;
}

export interface IMessageList {
  message: string;
  data: IMessageInfo[];
}

export interface IMendMessage {
  user_id: string;
  content: string;
}
