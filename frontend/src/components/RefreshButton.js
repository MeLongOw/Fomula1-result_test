import React, { useState } from "react";
import icons from "../utils/icons";

const { IoMdRefresh } = icons;

const RefreshButton = ({ handleClick = () => {} }) => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <button>
            <IoMdRefresh
                size={32}
                onClick={() => {
                    setIsLoading(true);
                    const isSucces = handleClick();
                    if (isSucces)
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 1000);
                }}
                className={`${
                    isLoading && "animate-spin"
                } hover:cursor-pointer`}
            />
        </button>
    );
};

export default RefreshButton;
