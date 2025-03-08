"use client";

import React, { createContext, Dispatch, SetStateAction, useState } from "react";

export interface ChatMessage {
    chat: string;
}

interface ChatContextType {
    chats: ChatMessage[];
    setChats: Dispatch<SetStateAction<ChatMessage[]>>;
    roomIdContext: number;
    setRoomIdContext: Dispatch<SetStateAction<number>>;
    roomNameContext: string;
    setRoomNameContext: Dispatch<SetStateAction<string>>;
}

const ChatContext = createContext<ChatContextType>({
    chats: [],
    setChats: () => {},
    roomIdContext: 0,
    setRoomIdContext: () => {},
    roomNameContext: "",
    setRoomNameContext: () => {}
});

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [chats, setChats] = useState<ChatMessage[]>([]);
    const [roomIdContext, setRoomIdContext] = useState<number>(0);
    const [roomNameContext, setRoomNameContext] = useState("")

    return (
        <ChatContext.Provider value={{ chats, setChats, roomIdContext, setRoomIdContext, roomNameContext, setRoomNameContext }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContext;