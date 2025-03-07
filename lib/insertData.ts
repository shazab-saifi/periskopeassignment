import { createClient } from "@supabase/supabase-js";

export async function insertRoom(roomName: string) {
    const supabaseUrl = 'https://qqlczkkvefrukkikqsaw.supabase.co';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { error } = await supabase
        .from("rooms")
        .insert({
            name: roomName
        })

        alert("Room created successfully")
    return error;
}