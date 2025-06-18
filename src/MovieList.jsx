import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard'; 
import './MovieList.css';
import MovieModal from './MovieModal';
import confetti from 'canvas-confetti';


function MovieList({movies, page, setPage}) {
    const apiKey = import.meta.env.VITE_API_KEY;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //handling the card to modal logic
    const [showModal, setShowModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardClick = async (movie) => {
        try {
            //reset this fetch to be from call with movie id specified
            const res = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`);
            const movieDetails = await res.json();
            setSelectedCard(movieDetails);
            setShowModal(true);

            confetti({
                particleCount: 60,
                spread: 70,
                origin: { y: 0.3 },
                shapes: ['text'],
                emojis: ['🍿'],
                scalar: 2,
                ticks: 120
            });

            // find canvas element and add CSS, set a higher z index so its brought forward and n ot under the modal!
            const confettiCanvas = document.querySelector('canvas');
            if (confettiCanvas) {
                confettiCanvas.classList.add('confetti-canvas');
            }

        } catch (err) {
            console.error("Error fetching movie details:", err);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };



    useEffect(() =>{

        // make a conditional to only load when there IS data in searchform
        if (movies && movies.length > 0){
            setData(movies);
            setLoading(false);
            return;
        }

        // fetch data will run everytime that the page number updates

const fetchData = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`);
        setData(prevData => {
            // combine previous and new movies
            const combined = [...prevData, ...response.data.results];
            // filter out duplicates by movie id
            const uniqueMovies = Array.from(
                new Map(combined.map(movie => [movie.id, movie])).values()
            );
            return uniqueMovies;
        });
    } catch (err) {
        console.error("error fetching movie list: ", err);
        setError(err);
    } finally {
        setLoading(false);
    }
};
        
        fetchData(); 
    }, [page, movies && movies.length === 0]);

    // useEffect(() => {
    //     if (movies && movies.length > 0) {
    //         setData(movies);
    //         setLoading(false);
    //     }
    // }, [movies]);

    useEffect(() => {
        if (movies && movies.length > 0) {
            setData(prevData => {
                if (page === 1) {
                    // New search or sort: replace
                    return movies;
                } else {
                    // Load more: append, avoid duplicates
                    const combined = [...prevData, ...movies];
                    const uniqueMovies = Array.from(
                        new Map(combined.map(movie => [movie.id, movie])).values()
                    );
                    return uniqueMovies;
                }
            });
            setLoading(false);
        }
    }, [movies, page]);

    if (loading){
        return <p>Loading....</p>;
    }
    if(error){
        return <p>Error: {error.message}</p>;
    }

    if (data.length === 0) {
        return <p> No movies found. Try a different search!</p>;
    }

    console.log(data);

    return (
        <div className='movieList'>
            {/* Map over the 'movies' array and render MovieCard for each */}
            {data.map((data) => (
                <div className='movie-list-container' key={data.id}>
                    <MovieCard
                    title={data.title} 
                    rating={data.vote_average} 
                    posterPath={data.poster_path} 
                    onCardClick={() => handleCardClick(data)}
                    />
                </div>
            ))}
            <MovieModal
                showModal={showModal}
                selectedCard={selectedCard}
                onClose={handleCloseModal}
            />
            
            <button className="moreCard" onClick={() => setPage(page + 1)}>
                Discover More
            </button>
        </div>

    );
}

export default MovieList