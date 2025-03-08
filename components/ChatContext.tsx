"use client";

import React, { createContext, Dispatch, RefObject, SetStateAction, useRef, useState } from "react";

export interface ChatMessage {
    chat: string;
}

interface ChatContextType {
    chats: ChatMessage[];
    setChats: Dispatch<SetStateAction<ChatMessage[]>>;
    roomIdContext: number;
    setRoomIdContext: Dispatch<SetStateAction<number>>
}

const ChatContext = createContext<ChatContextType>({
    chats: [],
    setChats: () => {},
    roomIdContext: 0,
    setRoomIdContext: () => {}
});

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [chats, setChats] = useState<ChatMessage[]>([]);
    const [roomIdContext, setRoomIdContext] = useState<number>(0);

    return (
        <ChatContext.Provider value={{ chats, setChats, roomIdContext, setRoomIdContext }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContext;