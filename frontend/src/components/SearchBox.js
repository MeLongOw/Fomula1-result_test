import React, { useEffect, useState } from "react";
import icons from "../utils/icons";
import CustomSelect from "./CustomSelect";

const { AiOutlineSearch, AiOutlineLoading } = icons;

const SearchBox = ({
    fetch = () => {},
    isOption = true,
    options = [],
    placeholder = "",
}) => {
    const [value, setValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [field, setField] = useState(options[0]);

    useEffect(() => {
        const timerId = setTimeout(() => {
            if (value) {
                fetch({ [field.value]: value });
            } else {
                fetch();
            }
            setIsLoading(false);
        }, 300);
        return () => {
            clearTimeout(timerId);
        };
    }, [value]);
    return (
        <div className="flex h-full">
            <div className="border flex bg-white items-center rounded-md px-3 mr-3">
                <input
                    placeholder={placeholder}
                    className="outline-none"
                    onChange={(e) => {
                        setIsLoading(true);
                        setValue(e.target.value);
                    }}
                    value={value}
                />
                <div className="pl-2">
                    {isLoading ? (
                        <AiOutlineLoading className="animate-spin" />
                    ) : (
                        <AiOutlineSearch />
                    )}
                </div>
            </div>
            {isOption && (
                <CustomSelect
                    className="border-none mr-4"
                    options={options}
                    isClearable={false}
                    isSearchable={false}
                    onChange={setField}
                    value={field}
                />
            )}
        </div>
    );
};

export default SearchBox;
