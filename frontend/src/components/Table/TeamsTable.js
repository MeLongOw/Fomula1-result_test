import React, { useEffect, useState } from "react";
import { SearchBox, RefreshButton } from "../index";
import dataTeams from "../../data/dataTeams.json";
import CustomSelect from "../CustomSelect";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
const defaultSearchOptions = [{ value: "team", label: "Team" }];

export default function TeamsTable() {
    const [data, setData] = useState([]);
    const [years, setYears] = useState([{ value: "all", label: "All-Years" }]);
    const [yearSelected, setYearSelected] = useState({
        value: 2023,
        label: 2023,
    });
    const [dataChart, setDataChart] = useState([]);
    const [searchPayload, setSearchPayload] = useState(null);
    const [isViewChart, setIsViewChart] = useState(false);

    const handleSelectYear = (e) => {
        setYearSelected(e);
    };

    const handleSearch = (obj) => {
        setSearchPayload(obj);
    };

    const handleRefresh = () => {};

    useEffect(() => {
        setYears((prev) => [
            ...prev,
            ...dataTeams.map((el) => ({ value: el?.year, label: el?.year })),
        ]);
    }, []);

    useEffect(() => {
        if (yearSelected !== "all")
            setDataChart(data[0]?.data.map((el) => ({ ...el, pts: +el?.pts })));
    }, [data, yearSelected]);

    useEffect(() => {
        if (searchPayload) {
            const key = Object.keys(searchPayload);
            setData(
                dataTeams
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
                    dataTeams.find((el) => el?.year === yearSelected?.value),
                ]);
            else {
                setData([...dataTeams]);
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
                {yearSelected.value !== "all" && (
                    <div className="flex flex-1 justify-start">
                        <button
                            className="border ml-4 px-3 bg-white rounded-md hover:border-gray-400"
                            onClick={() => setIsViewChart(!isViewChart)}
                        >
                            {!isViewChart ? "View as chart" : "Table as table"}
                        </button>
                    </div>
                )}
                {!isViewChart && (
                    <div className="flex items-center gap-4">
                        <SearchBox
                            placeholder="Search..."
                            isOption={true}
                            options={defaultSearchOptions}
                            fetch={handleSearch}
                        />
                        <RefreshButton handleClick={handleRefresh} />
                    </div>
                )}
            </div>

            {/* Table */}
            {!isViewChart && (
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
                                        POS
                                    </th>
                                    <th
                                        scope="col"
                                        className="w-[10%] px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        TEAM
                                    </th>
                                    <th
                                        scope="col"
                                        className="w-[10%] px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        PTS
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {data?.map(({ year, data }) =>
                                    data.map((el) => (
                                        <tr
                                            className=""
                                            key={`${year} + ${el.id}`}
                                        >
                                            <td className="px-6 py-4 text-left text-sm font-medium text-gray-800 break-words">
                                                {year}
                                            </td>
                                            <td className="px-6 py-4 text-left text-sm font-medium text-gray-800 break-words">
                                                {el?.pos}
                                            </td>
                                            <td className="px-6 py-4 text-left text-sm text-gray-800 break-words">
                                                {el?.team}
                                            </td>
                                            <td className="px-6 py-4 text-left text-sm text-gray-800 break-words">
                                                {el?.pts}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {isViewChart && (
                <div className="w-full h-[calc(100vh-76px-62px-56px)]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={dataChart}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="pos" />
                            <YAxis dataKey="pts" />
                            <Tooltip
                                labelFormatter={(value) => {
                                    const index = parseInt(value) - 1;
                                    return (
                                        <div>{`Pos: ${dataChart[index].pos}`}</div>
                                    );
                                }}
                                formatter={(a, b, { payload }) => {
                                    return [
                                        <div className="flex justify-start flex-col">
                                            <div>
                                                {`Points: ${payload?.pts}`}
                                            </div>
                                            <div>
                                                {`Team: ${payload?.team}`}
                                            </div>
                                            
                                        </div>,
                                    ];
                                }}
                            />
                            <Legend />
                            <Bar dataKey="pts" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}
