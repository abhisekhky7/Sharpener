import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import  db  from '../firebase/firebase'; // Ensure correct import
import ShowTimeForm from './ShowTimeForm';

const ShowTimeManagement = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  // Fetch the movie list from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'movies'), (snapshot) =>
      setMovies(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return () => unsubscribe();
  }, []);

  const handleSelectMovie = (movie) => {
    console.log("selected",movie)
    setSelectedMovie(movie); // Store selected movie in state
  };

  return (
    <div className='d-flex'>
      {/* <h4>Showtime Management</h4> */}
      <ul className='border' style={{height:"90vh",width:"25%"}}>
        {movies.map((movie) => (
          <li key={movie.id} className='border' onClick={() => handleSelectMovie(movie)}>
            {movie.name}
          </li>
        ))}
      </ul>
      <div className='w-75'>
      {selectedMovie && <ShowTimeForm movie={selectedMovie} />}
      </div>
    </div>
  );
};

export default ShowTimeManagement;
