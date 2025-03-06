import Image from "next/image";
import periskope from '@/public/periskope.png';

import { IoMdHome } from "react-icons/io";
import { IoGitNetworkOutline } from "react-icons/io5"; 
import { BsFillChatDotsFill } from "react-icons/bs";
import { BiSolidCoupon } from "react-icons/bi";
import { FaChartLine } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { AiFillProfile } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import { MdOutlineChecklist } from "react-icons/md";
import { TbSettingsFilled, TbStarsFilled, TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";

const Sidebar = () => {
  const menuIcons = [
    { icon: IoMdHome },
    { icon: BsFillChatDotsFill, fixedColor: "#0C8F4E" },
    { icon: BiSolidCoupon, extraClass: "rotate-[135deg]" },
    { icon: FaChartLine },
    { icon: LuMenu },
    { icon: HiMiniSpeakerWave },
    { icon: IoGitNetworkOutline, extraClass: "rotate-180" },
    { icon: AiFillProfile },
    { icon: TfiGallery },
    { icon: MdOutlineChecklist },
    { icon: TbSettingsFilled }
  ];

  const bottomIcons = [
    { icon: TbStarsFilled },
    { icon: TbLayoutSidebarLeftExpandFilled }
  ];

  return (
    <aside className="p-4 h-screen flex flex-col items-center justify-between">
      <div className="flex flex-col items-center space-y-7">
        <Image 
          src={periskope} 
          alt="profile" 
          width={32} 
          height={32} 
          className="rounded-full"
        />
        <div className="space-y-5">
          {menuIcons.map(({ icon: Icon, fixedColor, extraClass }, index) => (
            <Icon 
              key={index}
              className={`cursor-pointer transition-colors duration-200 ${
                fixedColor ? "" : "hover:text-[#0C8F4E]"
              } ${extraClass || ""}`} 
              size={24} 
              style={fixedColor ? { color: fixedColor } : {}}
            />
          ))}
        </div>
      </div>
      <div className="space-y-5 opacity-60">
        {bottomIcons.map(({ icon: Icon }, index) => (
          <Icon 
            key={index}
            className="cursor-pointer transition-colors duration-200 hover:text-[#0C8F4E]" 
            size={24} 
          />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
