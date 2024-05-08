import React from "react";

function MovieSorter({sortBy, setSortBy}) {
    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    }
    return (
        <div>
            <select value={sortBy} onChange={handleSortChange} >
                <option value="year">Recenti</option>
                <option value="rating">Rating</option>
                <option value="title">titolo</option>
            </select>
        </div>
    )

}


export { MovieSorter }