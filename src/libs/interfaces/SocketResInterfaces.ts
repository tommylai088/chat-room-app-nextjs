export interface IMarkMessageAsReadRes {
    roomId: string
    unreadCount: number;
}

export interface ITypingRes {
    senderId: string
    isTyping: boolean;
}