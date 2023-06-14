import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/F1.svg.png";
import icons from "../utils/icons";
import path from "../utils/path";

const { BsCarFront, FaFlagCheckered, RiTeamLine, BsArrowClockwise } = icons;
const sidebarItem = [
    {
        icon: <BsCarFront />,
        title: "Drivers",
        path: `${path.HOME}${path.DRIVERS}`,
    },
    {
        icon: <FaFlagCheckered />,
        title: "Races",
        path: `${path.HOME}${path.RACES}`,
    },
    {
        icon: <RiTeamLine />,
        title: "Teams",
        path: `${path.HOME}${path.TEAMS}`,
    },
    {
        icon: <BsArrowClockwise />,
        title: "Fastest Lap",
        path: `${path.HOME}${path.DHL}`,
    },
];
const Sidebar = () => {
    return (
        <div className="flex-shrink-0 w-[300px] border-r">
            <Link to="/" className="flex border-b p-5 h-[76px]">
                <img src={logo} alt="" className="w-full object-contain" />
            </Link>
            <div className="p-5">
                {sidebarItem?.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        className={({ isActive }) =>
                            isActive
                                ? "px-2 flex h-[44px] items-center font-medium hover:bg-gray-200 rounded-md mb-2 hover:cursor-pointer text-red-600"
                                : "px-2 flex h-[44px] items-center font-medium hover:bg-gray-200 rounded-md mb-2 hover:cursor-pointer"
                        }
                    >
                        <span className="pr-2">{item.icon}</span>
                        <span>{item.title}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
