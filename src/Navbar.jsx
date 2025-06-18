import React, { useState, useEffect } from 'react';

const Navbar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState(''); // state to keep track of search
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchQuery);
        setSearchQuery('');

    }
    
    return (
        <div>
            {/* input here will reflect the state */}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Search" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default Navbar;