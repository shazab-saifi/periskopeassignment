"use client"

import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

interface ChatContextType {
    chats: any[];
    setChats: Dispatch<SetStateAction<any[]>>;
}

const ChatContext = createContext<ChatContextType>({
    chats: [],
    setChats: () => {}
});

export const ChatProvider = ({ children }: {children: React.ReactNode}) => {
    const [chats, setChats] = useState<any[]>([]);

    return (
        <ChatContext.Provider value={{ chats, setChats }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContext;
