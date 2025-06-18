import { useState, useEffect } from 'react'
import './App.css'
import MovieList from './MovieList'
import Navbar from './Navbar';
import axios from 'axios'

const App = () => {
  const [page, setPage] = useState(1); // current page for pagination
  const [movies, setMovies] = useState([]);
  const [sort, setSort] = useState({by: "default"})

  const handleSearch = async (query) => {
    if (!query) return;
    try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&include_adult=false`
      );
    setMovies(response.data.results); // update movies state with search results
    } catch (err) {
      console.error('Search failed:', err);
    }
};

  const handleClear = () => {

    setMovies([]); // clears the search then reset the page number to 1 (edge case)
    setPage(1);
    setSort({ by: "default" }); 
    fetchNowPlaying(1);
  };

  const fetchSorted = async (sortBy, page = 1) => {
    try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=${sortBy}&page=${page}`);
      setMovies(response.data.results);
    } catch (err) {
      console.log("jackie pls I couldnt fetch the sorted stuff :(", err);
  }
};

const fetchNowPlaying = async (page = 1) => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`
    );
    setMovies(response.data.results);
  } catch (err) {
    console.error("Failed to fetch now playing movies:", err);
  }
};

  useEffect(() => {
    if (sort.by === "default") {
      fetchNowPlaying(page);
    } else {
      fetchSorted(sort.by, page);
    }
  }, [sort, page]);

  const handleSort = (e) => {
    setSort({by: e.target.value }); // updates the state 
    setPage(1); // resets to the first page regardless of what type of sort
};

  return (
    <div className="App">

      <header>

      <div className='navbar'>
        <h1>FLIXSTER</h1>
      </div>

      </header>

      <main>
        <div className='container'>
          <div className= "navbar">
            <div className='searchClear'>
              <Navbar onSearch={handleSearch} />
              <button onClick={(handleClear)}>Clear</button>
            </div>
            

            <select name="by" onChange = {handleSort} value={sort.by} className = "movie_sorting" >
              <option value = "default">Default</option>
              <option value="title.asc">Title A-Z</option>
              <option value="release_date.desc">Release Date</option>
              <option value="vote_average.desc">Vote Average</option>

            </select>
          </div>

          <div className = 'list-container'>
            <MovieList 
              movies={movies}
              setPage = {setPage}
              page = {page}
            />

          </div>
        </div>
      </main>
      <footer className="footer">
        Copyright © 2025 Salesforce x Codepath. All rights reserved.
      </footer>
    </div>
  )
}

export default App
