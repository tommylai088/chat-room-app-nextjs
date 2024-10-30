import { IUser } from "./UserInterfaces";

export interface ITypingUsers {
  [key: string]: boolean;
}

export interface IUnreadCounts {
  [key: string]: number;
}

export interface IMessage {
  createdAt: string;
  id: string;
  isRead: boolean;
  message: string;
  receiver: IUser;
  roomId: string;
  sender: IUser;
}

export interface IUserChat {
  latestMessage: IMessage;
  unreadCount: number;
}