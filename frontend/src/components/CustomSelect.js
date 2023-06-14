import React from "react";
import Select from "react-select";

const CustomSelect = ({ ...props }) => {
    return (
        <Select
            styles={{
                input: (base) => ({
                    ...base,
                    margin: "8px",
                    fontSize: "14px",
                    // color: "#fff",
                }),
                control: (base) => ({
                    ...base,
                    borderColor: "#e5e7eb",
                    backgroundColor: "#fff",
                    height: "100%",
                    borderRadius: "6px",
                    minWidth: "150px",
                    cursor: "pointer",
                }),
                placeholder: (provided) => ({
                    ...provided,
                    color: "rgb(209,213,219)",
                    fontWeight: "400",
                    margin: "8px",
                    fontSize: "14px",
                }),
            }}
            {...props}
            
        />
    );
};

export default CustomSelect;
