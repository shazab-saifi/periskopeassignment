import { ChatProvider } from '@/components/ChatContext';
import ChatSection from '@/components/ChatSection';
import Header from '@/components/Header';
import RIghtbar from '@/components/RIghtbar';
import RoomsSection from '@/components/RoomsSection';
import Sidebar from '@/components/Sidebar';

export default async function Home() {

    return (
        <ChatProvider>
            <div className='flex max-h-screen w-full fixed'>
                <Sidebar />
                <div className='w-full'>
                    <Header />
                    <div className='flex max-h-screen w-full justify-between'>
                        <RoomsSection />
                        <ChatSection />
                        <RIghtbar />
                    </div>
                </div>
            </div>
        </ChatProvider>
    );
}

