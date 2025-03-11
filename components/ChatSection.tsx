"use client"

import Image from "next/image";
import { FaSearch, FaMicrophone } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { IoSparklesSharp, IoSend } from "react-icons/io5";
import Avatars from "@/public/Frame 26.svg";
import periskope from "@/public/periskope.png";
import { useContext, useEffect, useRef, useState } from "react";
import { FiSmile, FiPaperclip } from "react-icons/fi";
import { GoClock } from "react-icons/go";
import { PiClockClockwiseFill } from "react-icons/pi";
import { HiOutlineSparkles } from "react-icons/hi";
import { RiFileList2Fill, RiExpandUpDownLine } from "react-icons/ri";
import { insertChat } from "@/lib/mutation";
import ChatContext from "./ChatContext";

const ChatSection = () => {
    const [message, setMessage] = useState("");
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const { chats, roomIdContext, roomNameContext } = useContext(ChatContext);

    const icons = [
        { icon: FiPaperclip },
        { icon: FiSmile },
        { icon: GoClock },
        { icon: PiClockClockwiseFill },
        { icon: HiOutlineSparkles },
        { icon: RiFileList2Fill },
        { icon: FaMicrophone }
    ];

    const handleClick = async () => {
        if(!message) {
            alert("Please write your message in the input box");
            return;
        }
        const error = await insertChat(message, roomIdContext);
        if (error) {
            console.error(error);
        }
        setMessage("");
    }

    useEffect(() => {
        const onEnterKey = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                if (!message.trim()) {
                    alert("Please write your message in the input box");
                    return;
                }
                handleClick();
            }
        }

        document.addEventListener("keydown", onEnterKey);

        return () => {
            document.removeEventListener("keydown", onEnterKey)
        }
    }, [message]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chats]);

    const MessageCard = ({ msg }: { msg: string }) => {
        return (
            <div className="w-fit bg-white py-2 px-4 rounded-md shadow-sm">
                {msg}
            </div>
        )
    }

    return (
        <div className="flex flex-col flex-grow">
            <div className="w-full flex justify-between space-x-4 items-center border-b border-slate-200 py-2 px-4">
                <div className="flex justify-between space-x-4 items-center">
                    <div className="rounded-full bg-[#DADDE2] p-3.5 w-12 h-12 flex items-center">
                        <FaUserGroup
                            size={22}
                            color="white"
                        />
                    </div>
                    <div className="flex flex-col text-lg font-bold">
                        <span>{roomNameContext}</span>
                        <span className="text-[#7f8ea1]">
                            <span>Rohan, Vishal, Umar, Sam, Rakesh, Shahrukh</span>
                        </span>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <Image
                        src={Avatars}
                        alt="avatars"
                        width={150}
                        height={38}
                        style={{ width: "auto", height: "auto" }}
                    />
                    <IoSparklesSharp
                        size={18}
                        color="#5D6876"
                    />
                    <FaSearch
                        size={18}
                        color="#5D6876"
                    />
                </div>
            </div>
            <div className="bg-chat">
                <div
                ref={chatContainerRef}
                className="p-4 flex flex-grow flex-col space-y-2 overflow-y-auto h-[630px]">
                    {chats.map((chat, index) => (
                        <MessageCard
                            key={index}
                            msg={chat.chat}
                        />
                    ))}
                </div>
            </div>
            <div className="bottom-15.5 flex flex-col bg-white h-fit p-4 w-full space-y-4 z-10">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Messages..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex flex-grow p-2 outline-none"
                    />
                    <IoSend
                        size={24}
                        color="#0C8F4E"
                        className="cursor-pointer"
                        onClick={handleClick}
                    />
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center space-x-6">
                        {icons.map(({ icon: Icon }, index) => (
                            <Icon
                                key={index}
                                size={20}
                                color="#5D6876"
                            />
                        ))}
                    </div>
                    <div className="w-fit flex items-center space-x-2 p-2 rounded-sm shadow-sm">
                        <Image
                            src={periskope}
                            alt="periskope"
                            width={18}
                            height={18}
                            className="rounded-full"
                        />
                        <span>Periskope</span>
                        <RiExpandUpDownLine
                            size={18}
                            color="#5D6876"
                            className="ml-16"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatSection