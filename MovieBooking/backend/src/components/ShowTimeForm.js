import React, { useEffect, useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import  db  from '../firebase/firebase';
import './ShowTimeForm.css';

const ShowTimeForm = ({ movie }) => {
  const [showtime, setShowtime] = useState({ date: '', time: '' });
  const [showtimes, setShowtimes] = useState(movie.showtimes || []);

  const handleChange = (e) => {
    setShowtime({ ...showtime, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (movie.showtimes) {
      setShowtimes(movie.showtimes);
    } else {
      setShowtimes([]); 
    }
  }, [movie]);

  const handleAddShowtime = async () => {
    if(!showtime.date || !showtime.time)return;
    const updatedShowtimes = [...showtimes, showtime];
    const movieRef = doc(db, 'movies', movie.id);
    await updateDoc(movieRef, { showtimes: updatedShowtimes });

    setShowtimes(updatedShowtimes); 
    setShowtime({ date: '', time: '' }); 
  };

  const handleDeleteShowtime = async (index) => {
    const updatedShowtimes = showtimes.filter((_, i) => i !== index);
    const movieRef = doc(db, 'movies', movie.id);
    await updateDoc(movieRef, { showtimes: updatedShowtimes });

    setShowtimes(updatedShowtimes); // Update the local state
  };

  return (
    <div>
      <h3>Manage Showtimes for {movie.name}</h3>
      <form>
        <input
          type="date"
          name="date"
          value={showtime.date}
          onChange={handleChange}
          placeholder="Select Date"
        />
        <input
          type="time"
          name="time"
          value={showtime.time}
          onChange={handleChange}
          placeholder="Select Time"
        />
        <button type="button" onClick={handleAddShowtime}>
          Add Showtime
        </button>
      </form>

      <h4>Existing Showtimes</h4>
      <ul>
        {showtimes.map((st, index) => (
          <li key={index} >
            {st.date} at {st.time}
            <button onClick={() => handleDeleteShowtime(index)} className="btn btn-danger ms-2">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowTimeForm;
