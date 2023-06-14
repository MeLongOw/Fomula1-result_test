import React, { useEffect, useState } from "react";
import { SearchBox, RefreshButton } from "../index";
import dataRaces from "../../data/dataRaces.json";
import CustomSelect from "../CustomSelect";

const defaultSearchOptions = [
    { value: "winner", label: "WINNER" },
    { value: "grandPrix", label: "GRAND GRIX" },
    { value: "car", label: "CAR" },
];

export default function RacesTable() {
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
            setData([dataRaces.find((el) => el?.year === yearSelected?.value)]);
        } else {
            setData([...dataRaces]);
        }
        return true;
    };

    useEffect(() => {
        setYears((prev) => [
            ...prev,
            ...dataRaces.map((el) => ({ value: el?.year, label: el?.year })),
        ]);
    }, []);

    useEffect(() => {
        if (searchPayload) {
            const key = Object.keys(searchPayload);
            setData(
                dataRaces
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
                    dataRaces.find((el) => el?.year === yearSelected?.value),
                ]);
            else {
                setData([...dataRaces]);
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
                                    year
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
                                    DATE
                                </th>
                                <th
                                    scope="col"
                                    className="w-[10%] px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                >
                                    WINNER
                                </th>
                                <th
                                    scope="col"
                                    className="w-[10%] px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                >
                                    CAR
                                </th>
                                <th
                                    scope="col"
                                    className="w-[5%] px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                >
                                    LAPS
                                </th>
                                <th
                                    scope="col"
                                    className="w-[5%] px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                >
                                    TIME
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
                                            {el?.date}
                                        </td>

                                        <td className="px-6 py-4 text-left text-sm text-gray-800 break-words">
                                            {el?.winner}
                                        </td>
                                        <td className="px-6 py-4 text-left text-sm text-gray-800 break-words">
                                            {el?.car}
                                        </td>
                                        <td className="px-6 py-4 text-left text-sm font-medium whitespace-nowrap ">
                                            {el?.laps}
                                        </td>
                                        <td className="px-6 py-4 text-left text-sm font-medium whitespace-nowrap ">
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
