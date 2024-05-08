import React from "react";

function MovieSorter({sortBy, setSortBy}) {
    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    }
    return (
        <div className="grid">
            <label for="sortBy">Ordina per:</label>
            <select id="sortBy" value={sortBy} onChange={handleSortChange} >
                <option value="year">Recenti</option>
                <option value="rating">Rating</option>
                <option value="title">titolo</option>
            </select>
        </div>
    )

}


export { MovieSorter }