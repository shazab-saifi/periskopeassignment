import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { LuRefreshCw } from "react-icons/lu";
import { RiEditLine } from "react-icons/ri";
import { RiMenu4Line } from "react-icons/ri";
import { LuLayoutList } from "react-icons/lu";
import { FaHubspot } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { CiAt } from "react-icons/ci";
import { RiFolderImageFill } from "react-icons/ri";
import { RiListSettingsLine } from "react-icons/ri";

const RIghtbar = () => {
    const icons = [
        { icon: TbLayoutSidebarLeftExpandFilled },
        { icon: LuRefreshCw },
        { icon: RiEditLine },
        { icon: RiMenu4Line },
        { icon: LuLayoutList },
        { icon: FaHubspot },
        { icon: HiMiniUserGroup },
        { icon: CiAt },
        { icon: RiFolderImageFill },
        { icon: RiListSettingsLine }
    ];

    return (
        <div className=" p-4 border-l border-slate-200">
            <div className="space-y-7 mt-12">
                {icons.map(({ icon: Icon }, index) => (
                    <Icon
                        key={index}
                        size={20}
                        color="#ACB3BD"
                    />
                ))}
            </div>
        </div>
    )
}

export default RIghtbar