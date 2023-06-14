import React, { memo, useState } from "react";
import icons from "../utils/icons";

const { AiOutlineLoading, FaCheck } = icons;

const Button = ({
    disabled = false,
    name,
    handleClick = () => {},
    className,
    hasIconSuccess = false,
    textColor = "text-white",
    backgroundColor = "bg-main",
    iconsBefore,
    iconsAfter,
    rounded = false,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSuccess = () => {
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 1000);
    };

    let isNotPreventOnClick = true;
    if (disabled) {
        isNotPreventOnClick = undefined;
    }

    return (
        <button
            disabled={disabled}
            type="button"
            className={
                className
                    ? className
                    : `px-4 py-2 ${
                          rounded && "rounded-md"
                      } ${textColor} font-semibold  w-full flex justify-center items-center ${backgroundColor} ${
                          disabled ? "opacity-70" : "hover:cursor-pointer"
                      }`
            }
            onClick={
                isNotPreventOnClick &&
                (async () => {
                    setIsLoading(true);
                    if (handleClick?.constructor?.name === "AsyncFunction") {
                        const isSuccessHandle = await handleClick();
                        if (isSuccessHandle) handleSuccess();
                    } else {
                        handleClick();
                        handleSuccess();
                    }
                })
            }
        >
            {isLoading ? (
                <AiOutlineLoading size={24} className="animate-spin" />
            ) : (
                <>
                    {isSuccess ? (
                        hasIconSuccess ? (
                            <FaCheck size={24} />
                        ) : (
                            <>
                                {iconsBefore && <div>{iconsBefore}</div>}
                                <span className="mx-2">{name}</span>
                                {iconsAfter && <div>{iconsAfter}</div>}
                            </>
                        )
                    ) : (
                        <>
                            {iconsBefore && <div>{iconsBefore}</div>}
                            <span className="mx-2">{name}</span>
                            {iconsAfter && <div>{iconsAfter}</div>}
                        </>
                    )}
                </>
            )}
        </button>
    );
};

export default memo(Button);
