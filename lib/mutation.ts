import { createClient } from "@supabase/supabase-js";

export async function insertRoom(roomName: string) {
    const supabaseUrl = 'https://qqlczkkvefrukkikqsaw.supabase.co';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase
        .from("rooms")
        .insert({
            name: roomName
        });

        alert("Room created successfully");
    return error;
}

export async function insertChat(chat: string) {
    const supabaseUrl = 'https://qqlczkkvefrukkikqsaw.supabase.co';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase
        .from("chats")
        .insert({
            roomId: 1,
            chat: chat
        });

    return error;
}

export async function fetchChats(roomId: number) {
    const supabaseUrl = 'https://qqlczkkvefrukkikqsaw.supabase.co';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

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