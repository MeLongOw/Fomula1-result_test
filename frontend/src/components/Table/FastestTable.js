import React, { useEffect, useState } from "react";
import { SearchBox, RefreshButton } from "../index";
import dataDHL from "../../data/dataDHL.json";
import CustomSelect from "../CustomSelect";

const defaultSearchOptions = [
    { value: "grandPrix", label: "GRAND PRIX" },
    { value: "driver", label: "DRIVER" },
    { value: "car", label: "CAR" },
];

export default function FastestTable() {
    const [data, setData] = useState([]);
    const [years, setYears] = useState([{ value: "all", label: "All-Years" }]);
    const [yearSelected, setYearSelected] = useState({
        value: 2023,
        label: 2023,
    });
    const [searchPayload, setSearchPayload] = useState(null);

    const handleSelectYear = (e) => {
        setYearSelected(e);
    };

    const handleSearch = (obj) => {
        setSearchPayload(obj);
    };

    const handleRefresh = () => {
        if (yearSelected?.value !== "all") {
            setData([
                dataDHL.find((el) => el?.year === yearSelected?.value),
            ]);
        } else {
            setData([...dataDHL]);
        }
        return true;
    };

    useEffect(() => {
        setYears((prev) => [
            ...prev,
            ...dataDHL.map((el) => ({ value: el?.year, label: el?.year })),
        ]);
    }, []);

    useEffect(() => {
        if (searchPayload) {
            const key = Object.keys(searchPayload);
            setData(
                dataDHL
                    .filter((el) => {
                        return el.data.some((el) =>
                            el[key]
                                ?.toLowerCase()
                                .includes(searchPayload[key]?.toLowerCase())
                        );
                    })
                    .map((el) => ({
                        year: el?.year,
                        data: el.data.filter((el) =>
                            el[key]
                                ?.toLowerCase()
                                .includes(searchPayload[key]?.toLowerCase())
                        ),
                    }))
            );
            setYearSelected(years[0]);
        } else {
            if (yearSelected?.value !== "all")
                setData([
                    dataDHL.find((el) => el?.year === yearSelected?.value),
                ]);
            else {
                setData([...dataDHL]);
            }
        }
    }, [searchPayload, yearSelected, years]);

    return (
        <div className="relative">
            {/* Action */}
            <div className="flex justify-between py-3">
                <div className="flex">
                    <CustomSelect
                        options={years}
                        isClearable={false}
                        isSearchable={false}
                        defaultValue={yearSelected}
                        value={yearSelected}
                        onChange={(e) => handleSelectYear(e)}
                    />
                </div>
                <div className="flex items-center gap-4">
                    <SearchBox
                        placeholder="Search..."
                        isOption={true}
                        options={defaultSearchOptions}
                        fetch={handleSearch}
                    />
                    <RefreshButton handleClick={handleRefresh} />
                </div>
            </div>

            {/* Table */}
            <div className="w-full inline-block align-middle">
                <div className="overflow-x-auto border rounded-lg">
                    <table className="w-full divide-y divide-gray-200 bg-white overflow-x-auto table-fixed">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="w-[10%] px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                >
                                    YEAR
                                </th>
                                <th
                                    scope="col"
                                    className="w-[10%] px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                >
                                    GRAND PRIX
                                </th>
                                <th
                                    scope="col"
                                    className="w-[10%] px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                >
                                    DRIVER
                                </th>
                                <th
                                    scope="col"
                                    className="w-[10%] px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                >
                                    CAR
                                </th>
                                <th
                                    scope="col"
                                    className="w-[10%] px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                >
                                    Time
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {data?.map(({ year, data }) =>
                                data.map((el) => (
                                    <tr className="" key={`${year} + ${el.id}`}>
                                        <td className="px-6 py-4 text-left text-sm font-medium text-gray-800 break-words">
                                            {year}
                                        </td>

                                        <td className="px-6 py-4 text-left text-sm font-medium text-gray-800 break-words">
                                            {el?.grandPrix}
                                        </td>
                                        <td className="px-6 py-4 text-left text-sm text-gray-800 break-words">
                                            {el?.driver}
                                        </td>
                                        <td className="px-6 py-4 text-left text-sm text-gray-800 break-words">
                                            {el?.car}
                                        </td>
                                        <td className="px-6 py-4 text-left text-sm text-gray-800 break-words">
                                            {el?.time}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
