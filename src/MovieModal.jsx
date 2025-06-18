import React from "react";
import './MovieModal.css';
import './MovieList';



function MovieModal ({ showModal, selectedCard, onClose }) {
    if (!showModal || !selectedCard) return null;
    console.log(selectedCard);
    return (
    <div className="modal">
        <div className="modal-content">
            <img src = {`https://image.tmdb.org/t/p/w500${selectedCard.backdrop_path}`} />
            <p> ----------------------------- </p>
            <h2>{selectedCard.title}</h2>
            <h3>Release Date: {selectedCard.release_date}</h3>
            <h4>Duration: {selectedCard.runtime} mins</h4>
            <p>{selectedCard.overview}</p>
            {/* 
                db returns genres as an array of name and id
                so depended on the API endpoint, genres might be just an array of IDs
                join genres as string.
                If not, display 'N/A'. */}
            <h4>Genres:  {selectedCard.genres && selectedCard.genres.length > 0
                ? selectedCard.genres.map(g => g.name).join(', ')
                : 'N/A'}
            </h4>
            <button onClick={onClose}> Close </button>
        </div>
    </div>
    );
}

export default MovieModal;