import React from 'react';
import './MoviesAtTop.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function MoviesAtTop({list}) {
    const category = useSelector((state)=>state.movie.category)
    const navigate = useNavigate();

    const handleNavigate=(movie)=>{
    //  console.log("from top",item);
    
       navigate("/moviepage", { state: { movie } });
    }
    return (
        <div className=" mt-3" style={{height:"90vh"}}>
        <h3 className='my-5 title'>{category}</h3>
        <ul className="d-flex  container-fluid justify-content-center mt-4">
          {list.slice(0,5).map((item) => {
            return (
              <li key={item.id} className=" text-start m-2" onClick={()=>handleNavigate(item)} >
                <div className="" style={{borderBottom:"3px solid orange"}}>
                  <img src={item.imageLink} alt="movie_image" style={{height:350,width:220,objectFit:'cover'}} />
                </div>
                <p className=" fw-bold text-black fs-5"> {item.name}</p>
                <span style={{fontSize:15}} className="fw-semibold">Release: {item.releaseDate}</span>
                <div className=" test">
                  <h5 className='title'>{item.name}</h5>
                  <span>Release: {item.releaseDate}</span><br/>
                  <span>Genre: {item.genre}</span><br/>
                  <span>Duration: {item.showtime}</span><br/>
                  <span>Language: {item.language}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
};
