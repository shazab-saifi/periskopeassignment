"use client"

import Image from "next/image";
import { FaSearch, FaMicrophone } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { IoSparklesSharp, IoSend } from "react-icons/io5";
import Avatars from "@/public/Frame 26.svg";
import periskope from "@/public/periskope.png";
import { useContext, useState } from "react";
import { FiSmile, FiPaperclip } from "react-icons/fi";
import { GoClock } from "react-icons/go";
import { PiClockClockwiseFill } from "react-icons/pi";
import { HiOutlineSparkles } from "react-icons/hi";
import { RiFileList2Fill, RiExpandUpDownLine } from "react-icons/ri";
import { insertChat } from "@/lib/mutation";
import ChatContext from "./ChatContext";

const ChatSection = () => {
    const [message, setMessage] = useState("");
    const { chats, roomIdRefContext } = useContext(ChatContext);
    console.log(chats.map((chat) => console.log(chat.chat)));
    console.log(roomIdRefContext.current)

    const icons = [
        { icon: FiPaperclip },
        { icon: FiSmile },
        { icon: GoClock },
        { icon: PiClockClockwiseFill },
        { icon: HiOutlineSparkles },
        { icon: RiFileList2Fill },
        { icon: FaMicrophone }
    ];

    const handlClick = () => {
        const error = insertChat(message, roomIdRefContext.current);
        if (error) {
            console.error(error);
        }
        setMessage("");
    }

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
                        <span>Room 1</span>
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
                        style={{width: "auto", height: "auto"}}
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
            <div className="relative bg-chat flex flex-grow">
                <div className="p-4 flex flex-grow flex-col space-y-2">
                    {chats.map((chat, index) => (
                        <MessageCard
                            key={index}
                            msg={chat.chat}
                        />
                    ))}
                </div>
                <div className="absolute bottom-15.5 flex flex-col bg-white h-fit p-4 w-full space-y-4">
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
                            onClick={handlClick}
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
        </div>
    )
}

export default ChatSection