"use client";

import React, { createContext, Dispatch, RefObject, SetStateAction, useRef, useState } from "react";

interface ChatMessage {
    chat: string;
}

interface ChatContextType {
    chats: ChatMessage[];
    setChats: Dispatch<SetStateAction<ChatMessage[]>>;
    roomIdRefContext: RefObject<number>;
}

const ChatContext = createContext<ChatContextType>({
    chats: [],
    setChats: () => {},
    roomIdRefContext: { current: 0 },
});

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [chats, setChats] = useState<ChatMessage[]>([]);
    const roomIdRefContext = useRef<number>(0);

    return (
        <ChatContext.Provider value={{ chats, setChats, roomIdRefContext }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContext;