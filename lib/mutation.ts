import supabase from "./supabaseClient";

export async function insertRoom(roomName: string) {
    const { error } = await supabase
        .from("rooms")
        .insert({
            name: roomName
        });

        alert("Room created successfully");
    return error;
}

export async function insertChat(chat: string, roomId: number) {
    const { error } = await supabase
        .from("chats")
        .insert({
            roomId: roomId,
            chat: chat
        });

    return error;
}

export async function fetchChats(roomId: number) {
    const { data, error } = await supabase
        .from("chats")
        .select("chat")
        .eq("roomId", roomId);

    if (error) {
        console.log(error);
    }
    if (data) {
        return data;
    }
}

// export async function fetchRoom(rooma) {

// }