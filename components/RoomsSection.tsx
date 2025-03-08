"use client"

import { HiFolderDownload } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import periskope from "@/public/periskope.png";
import Image from "next/image";
import CreateRoomDialog from "./CreateRoomDialog";
import { MouseEventHandler, useContext, useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { fetchChats } from "@/lib/mutation";
import ChatContext from "./ChatContext";

export const RoomCard = ({
    roomName,
    onClick
}: {
    roomName: string,
    onClick: MouseEventHandler<HTMLDivElement>
}) => {
    return (
        <div
            onClick={onClick}
            className="w-[27.76rem] p-4 flex space-x-3.5 font-bold text-lg active:bg-gray-100 cursor-pointer"
        >
            <div className="rounded-full bg-[#DADDE2] p-4 w-14 h-14 flex items-center">
                <FaUserGroup
                    size={22}
                    color="white"
                />
            </div>
            <div className="flex flex-col">
                <span>{roomName}</span>
                <span className="text-[#7f8ea1]">Hii, I was thinking of joining your...</span>
                <span className="text-[#7f8ea1] rounded-sm bg-[#EFF1F3] flex items-center space-x-1 text-[12px] px-1 w-fit">
                    <FaPhoneAlt size={10} />
                    <span>+ 91 8234982900993 +</span>
                </span>
            </div>
            <div className="h-full flex flex-col space-y-1.5 items-end text-[12px]">
                <span className="p-1 bg-[#FEF5F5] text-[#EB6B63] rounded-sm">Demo</span>
                <Image
                    src={periskope}
                    alt="profile"
                    width={16}
                    className="rounded-full"
                />
                <span className="text-[#7f8ea1]">Today</span>
            </div>
        </div>
    )
}

interface RoomsType {
    id: number
    name: string
}

const RoomsSection = () => {
    const [rooms, setRooms] = useState<RoomsType[]>([]);
    const [messages, setMessage] = useState([]);
    const roomIdRef = useRef(0);
    const { setChats } = useContext(ChatContext);
    setChats(messages as any[]);

    const supabaseUrl = 'https://qqlczkkvefrukkikqsaw.supabase.co';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!
    const supabase = createClient(supabaseUrl, supabaseKey)

    useEffect(() => {
        const fetchRooms = async () => {
            const { data, error } = await supabase.from("rooms").select("*");
            if (error) {
                console.error(error);
            }
            if (data) {
                setRooms(data);
            }
        };

        fetchRooms();

        const subscription = supabase
            .channel("realtime:rooms")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "rooms" },
                (payload) => {
                    console.log("Change detected:", payload);
                    fetchRooms();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const handleOnClick = async (roomId: number) => {
        if (!roomId || roomIdRef.current === null) return;
        roomIdRef.current = roomId;
        const data = await fetchChats(roomId);
        setMessage(data as any);
    }

    useEffect(() => {
        const fetchChats = async () => {
            const { data, error } = await supabase.from("chats").select("chat").eq("roomId", roomIdRef.current);
            if (error) {
                console.log(error)
            }
            if (data) {
                setMessage(data as any);
            }
        }

        const subscription = supabase
            .channel("realtime:chats")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "chats" },
                (payload) => {
                    console.log("Change detected: ", payload);
                    fetchChats();
                }
            ).subscribe()


        return () => {
            supabase.removeChannel(subscription);
        };
    });

    return (
        <div className="relative flex flex-col max-h-screen overflow-y-hidden">
            <div className="border-r border-slate-200">
                <div className='p-4 text-sm font-bold flex justify-between border-b border-slate-200'>
                    <div className="flex items-center space-x-2">
                        <HiFolderDownload
                            size={18}
                            color="#0C8F4E"
                        />
                        <span className="text-[#0C8F4E]">Custom filter</span>
                        <button className="px-2 py-1 shadow-sm rounded-sm text-[#5D6876]">Save</button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="px-2 py-1 shadow-sm rounded-sm text-[#5D6876] flex items-center space-x-2">
                            <FaSearch size={12} />
                            <span>Search</span>
                        </button>
                        <button className="px-2 py-1 shadow-sm rounded-sm text-[#0C8F4E] flex items-center space-x-2">
                            <IoFilterSharp size={12} />
                            <span>Filtered</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col overflow-y-auto max-h-[calc(100vh-8rem)]">
                {rooms.map((room, id) => (
                    <RoomCard
                        key={id}
                        roomName={room.name}
                        onClick={() => handleOnClick(room.id)}
                    />
                ))}
            </div>
            <CreateRoomDialog />
        </div>
    )
}

export default RoomsSection