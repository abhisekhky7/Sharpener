// src/pages/AddMovie.js
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import db from '../firebase/firebase'
import { deleteFromDb, savetoDb } from '../utils/savetoDb';

const AddMovie = () => {

  const [list ,setList]=useState([]);
  const [movieDetails, setMovieDetails] = useState({
    name: '',
    description: '',
    director: '',
    genre: '',
    releaseDate: '',
    language: '',
    imdbRating: '',
    trailerLink: '',
    imageLink:'',
  });
  const handleDelete=(id)=>{
    deleteFromDb("movies",id)

  }

  useEffect(
    ()=>onSnapshot(collection(db,"movies"),(snapshot)=>
    setList(snapshot.docs.map((doc)=>({...doc.data(),id:doc.id})))
  ),[]
  )

  const handleChange = (e) => {
    setMovieDetails({
      ...movieDetails,
      [e.target.name]: e.target.value
    });
  };

  const addMovie = async (e) => {
    e.preventDefault();
    const result = await savetoDb('movies', movieDetails);
    if (result.success) {
      // alert('Movie added successfully!');
      setMovieDetails({
        name: '',
        description: '',
        director: '',
        genre: '',
        releaseDate: '',
        language: '',
        imdbRating: '',
        showtime: '',
        trailerLink: '',
        imageLink:'',
      });
    } else {
      alert('Something went wrong');
    }
  };


  return (
    <div>


<ul className="d-flex border gap-2">
        {list.map((item)=>{
           return <li key={item.id} className="d-flex align-items-center  rounded-2">
           {item.name}
           <span onClick={()=>handleDelete(item.id)} className="ms-1 btn btn-sm border text-danger fw-bold">X</span>
         </li>
        })}
      </ul>

      <h2>Add Movie</h2>
      <form onSubmit={addMovie}>
        <input type="text" name="name" placeholder="Movie Name" value={movieDetails.name} onChange={handleChange} /><br/>
        <textarea name="description" placeholder="Description" value={movieDetails.description} onChange={handleChange} /><br/>
        <input type="text" name="director" placeholder="Director" value={movieDetails.director} onChange={handleChange} /><br/>
        <input type="text" name="genre" placeholder="Genre" value={movieDetails.genre} onChange={handleChange} /><br/>
        <input type="date" name="releaseDate" value={movieDetails.releaseDate} onChange={handleChange} /><br/>
        <input type="text" name="language" placeholder="Language" value={movieDetails.language} onChange={handleChange} /><br/>
        <input type="number" name="imdbRating" placeholder="IMDB Rating"  value={movieDetails.imdbRating}onChange={handleChange} /><br/>
        <input type="text" name="trailerLink" placeholder="Trailer Link" value={movieDetails.trailerLink} onChange={handleChange} /><br/>
        <input type="text" name="imageLink" placeholder="Image Link" value={movieDetails.imageLink} onChange={handleChange} /><br/>
       
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
