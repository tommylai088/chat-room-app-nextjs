import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { initialState, messagesReducer } from './messagesReducer';
import { Action, IMessagesState } from './type';

// Create context with type definitions
const MessagesContext = createContext<{
    state: IMessagesState;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => undefined, // Placeholder
});

// Provider component
export const MessagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(messagesReducer, initialState);

    // Memoize value to prevent unnecessary re-renders
    const value = useMemo(() => ({ state, dispatch }), [state]);

    return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>;
};

// Custom hook for using the context
export const useMessagesContext = () => {
    const context = useContext(MessagesContext);
    if (!context) {
        throw new Error('useMessagesContext must be used within a MessagesProvider');
    }
    return context;
};