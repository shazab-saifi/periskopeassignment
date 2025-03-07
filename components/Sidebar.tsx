import Image from "next/image";
import periskope from '@/public/periskope.png';
import { IoMdHome } from "react-icons/io";
import { IoGitNetworkOutline } from "react-icons/io5";
import { BsFillChatDotsFill } from "react-icons/bs";
import { BiSolidCoupon } from "react-icons/bi";
import { FaChartLine } from "react-icons/fa";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { AiFillProfile } from "react-icons/ai";
import { RiFolderImageFill } from "react-icons/ri";
import { MdOutlineChecklist } from "react-icons/md";
import { TfiMenuAlt } from "react-icons/tfi";
import { TbSettingsFilled, TbStarsFilled, TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";

const Sidebar = () => {
  const menuIcons = [
    { icon: IoMdHome },
    { icon: BsFillChatDotsFill, fixedColor: "#0C8F4E" },
    { icon: BiSolidCoupon, extraClass: "rotate-[135deg]" },
    { icon: FaChartLine },
    { icon: TfiMenuAlt },
    { icon: HiMiniSpeakerWave },
    { icon: IoGitNetworkOutline, extraClass: "rotate-180" },
    { icon: AiFillProfile },
    { icon: RiFolderImageFill },
    { icon: MdOutlineChecklist },
    { icon: TbSettingsFilled }
  ];

  return (
    <aside className="p-4 w-fit h-screen flex flex-col items-center justify-between border-r border-slate-200">
      <div className="flex flex-col items-center space-y-8">
        <Image
          src={periskope}
          alt="profile"
          width={42}
          className="rounded-full"
        />
        <div className="space-y-6">
          {menuIcons.map(({ icon: Icon, fixedColor, extraClass }, index) => (
            <Icon
              key={index}
              className={`cursor-pointer transition-colors duration-200 ${fixedColor ? "" : "hover:text-[#0C8F4E] text-[#5D6876]"
                } ${extraClass || ""}`}
              size={24}
              style={{ color: fixedColor }}
            />
          ))}
        </div>
      </div>
      <div className="space-y-5 opacity-60">
        <TbStarsFilled
          className="cursor-pointer transition-colors duration-200 hover:text-[#0C8F4E]"
          size={24}
        />
        <TbLayoutSidebarLeftExpandFilled
          className="cursor-pointer transition-colors duration-200 hover:text-[#0C8F4E]"
          size={24}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
