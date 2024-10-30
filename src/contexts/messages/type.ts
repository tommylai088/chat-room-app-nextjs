import { IMarkMessageAsReadRes, ITypingRes, ITypingUsers, IUnreadCounts, IUser } from "@/libs/interfaces";

export interface IMessagesState {
  selectedUser?: IUser;
  typingUsers: ITypingUsers;
  unreadCounts: IUnreadCounts;
}

// Action type definitions
export type Action =
  | { type: 'SELECT_USER'; payload: IUser }
  | { type: 'SEARCH_USER'; payload: string }
  | { type: 'UPDATE_TYPING_USERS'; payload: ITypingRes }
  | { type: 'SET_MESSAGE_COUNTS'; payload: IUnreadCounts }
  | { type: 'SET_MESSAGE_COUNT'; payload: IMarkMessageAsReadRes };