import React from "react";
import { IconType } from "react-icons";
import { BsFillChatDotsFill } from "react-icons/bs";
import { LuRefreshCcwDot } from "react-icons/lu";
import { IoMdHelpCircleOutline, IoMdNotificationsOff } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
import { RiExpandUpDownLine } from "react-icons/ri";
import { MdInstallDesktop } from "react-icons/md";
import { TfiMenuAlt } from "react-icons/tfi";
import { IoSparklesSharp } from "react-icons/io5";

interface IconButtonProps {
  icon: IconType;
  label?: string;
  extraIcon?: IconType;
  iconColor?: string;
  textColor?: string;
  size?: number;
}

const IconButton: React.FC<IconButtonProps> = ({ icon: Icon, label, extraIcon: ExtraIcon, iconColor, textColor, size }) => (
  <div className={`flex items-center space-x-2 py-1 px-3 shadow-sm rounded-sm cursor-pointer ${textColor || "text-[#5D6876]"}`}>
    <Icon size={size || 16} color={iconColor || "inherit"} />
    {label && <span>{label}</span>}
    {ExtraIcon && <ExtraIcon size={16} color="#5D6876" />}
  </div>
);

const Header: React.FC = () => {
  return (
    <div className="flex justify-between w-full h-fit text-sm font-semibold p-4 border-b border-slate-200">
      <div className="flex items-center text-[#5D6876] space-x-2">
        <BsFillChatDotsFill size={16} />
        <span>Chats</span>
      </div>
      <div className="flex space-x-4">
        <IconButton icon={LuRefreshCcwDot} label="Refresh" />
        <IconButton icon={IoMdHelpCircleOutline} label="Help" textColor="text-black" iconColor="black" />
        <IconButton
          icon={FaCircle}
          size={12}
          label="5 / 6 phones"
          extraIcon={RiExpandUpDownLine}
          iconColor="#FFC800"
          textColor="text-black"
        />
        <IconButton icon={MdInstallDesktop} />
        <IconButton icon={IoMdNotificationsOff} />
        <IconButton
          icon={IoSparklesSharp}
          extraIcon={TfiMenuAlt}
          iconColor="#FFC800"
        />
      </div>
    </div>
  );
};

export default Header;
