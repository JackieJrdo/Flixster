import React, { useState } from 'react';
import './MovieCard.css';


function MovieCard({ title, rating, posterPath, onCardClick }) {

    const [liked, setLiked] = useState(false);

    const handleHeartClick = (e) => {
        e.stopPropagation();
        setLiked((prev) => !prev);
    };

    return (
        <div className = "movie-card" onClick={onCardClick}>
            <span
                className={`heart${liked ? ' liked' : ''}`}
                onClick={handleHeartClick}
            >
                &#x2665;
            </span>

            <div className = "movie-img">
                <img src = {`https://image.tmdb.org/t/p/w500${posterPath}`} alt = "Movie poster image"/>
            </div>
            <div className='movie-title'>
                <h1>{title}</h1>
            </div>
            <div className = "movie-rating">
                <p> ☆ {rating}</p>
            </div>
        </div>
    )
}

export default MovieCard;