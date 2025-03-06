
import Header from '@/components/Header';
import RIghtbar from '@/components/RIghtbar';
import Sidebar from '@/components/Sidebar';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qqlczkkvefrukkikqsaw.supabase.co';
// console.log(process.env.SUPABASE_KEY)
const supabaseKey = process.env.SUPABASE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function Home() {
    // const { data, error } = await supabase
    //     .from("chats")
    //     .select("*")
    //     .gte("roomId", 1)

    // if (error) {
    //     console.log(error);
    //     return;
    // }

    // console.log(data);
    return (
        <div className='flex realtive h-full w-full fixed'>
            <Sidebar />
            <Header />
            <RIghtbar />
        </div>
    )
}