import React from "react";

function MovieFilter({filter, setFilter, genres}) {
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    }
    return (
        <div className="grid">
            <label for="filter">Filtra per categorie</label>
            <select id="filter" name="filter" value={filter} onChange={handleFilterChange}>
                <option value="all">Tutti</option>
                {genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}

              
            </select>
        </div>
    )

}


export { MovieFilter }