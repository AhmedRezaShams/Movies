import React from 'react'

function Serach({searchTerm, setSearchterm}) {
    return (
        <div className='search'>
            <div>
                <img src="search.svg" alt="search" />
                <input type="text"
                placeholder='Search through thousand of movies' 
                value={searchTerm}
                onChange={(e) => setSearchterm(e.target.value)}
                />
            </div>
        </div>
    )
}

export default Serach
