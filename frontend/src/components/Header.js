import React from "react";
import icons from "../utils/icons";

const { AiOutlineMenu } = icons;

const Header = ({ isHideSideBar, setIsHideSideBar }) => {
    return (
        <div className="h-[76px] border-b w-full flex justify-between items-center p-[28px]">
            <div
                className="border rounded-md w-10 h-10 flex items-center justify-center mr-2 hover:bg-gray-200 hover:cursor-pointer"
                onClick={() => setIsHideSideBar(!isHideSideBar)}
            >
                <AiOutlineMenu />
            </div>
        </div>
    );
};

export default Header;
