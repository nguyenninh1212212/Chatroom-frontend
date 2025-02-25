export interface IMessageInfo {
  content: string;
  created: string;
  mine: boolean;
  email: string;
  sender: string;
}

export interface IMessageInfo2 {
  content: string;
  created: string; // Hoặc có thể sử dụng Date nếu muốn làm việc với kiểu dữ liệu ngày tháng
  email: string;
  room_id: string;
  sender: string;
  user_id: string;
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
