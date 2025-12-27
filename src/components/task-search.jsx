import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export function TaskSearch({ onSearch, onFilter }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const debounce = useDebouncedCallback((value) => { onSearch(value); }, 500); // 500ms debounce time to delay search

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        debounce(e.target.value);
    };

    const handleStatus = (e) => {
        const selectedStatus = e.target.value;
        setStatusFilter(selectedStatus);
        onFilter(selectedStatus);
    };


    // useEffect(() => {
    //     if (debounce) {
    //         console.log("Searching for:", debounce);
    //     }
    // }, [debounce]);

    return (
        <>
            <div className=" mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 flex shadow-xs rounded-base">
                <div>
                    <input type="text" id="search" className="rounded-none rounded-e-base block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand placeholder:text-body"
                        placeholder="Search tasks ......" value={searchTerm} onChange={handleSearchChange} />
                </div>
                <div>
                    <label className="text-sm font-bold mr-2" htmlFor="status-filter">
                        Filter by Status
                    </label>
                    <select className=" border rounded py-2 px-3 text-gray-700" id="status-filter" value={statusFilter}
                        onChange={handleStatus}>
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
            </div>
        </>

    );
}
