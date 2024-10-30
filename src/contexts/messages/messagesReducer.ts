import { Action, IMessagesState } from './type';

export const initialState: IMessagesState = {
    selectedUser: undefined,
    typingUsers: {},
    unreadCounts: {},
};

export const messagesReducer = (state: IMessagesState, action: Action): IMessagesState => {
    switch (action.type) {
        case 'SELECT_USER':
            return { ...state, selectedUser: action.payload };
        case 'UPDATE_TYPING_USERS':
            return {
                ...state,
                typingUsers: {
                    ...state.typingUsers,
                    [action.payload.senderId]: action.payload.isTyping,
                },
            };
        case 'SET_MESSAGE_COUNTS':
            return { ...state, unreadCounts: { ...state.unreadCounts, ...action.payload } };
        case 'SET_MESSAGE_COUNT':
            return {
                ...state,
                unreadCounts: { ...state.unreadCounts, [action.payload.roomId]: action.payload.unreadCount },
            };
        default:
            return state;
    }
};