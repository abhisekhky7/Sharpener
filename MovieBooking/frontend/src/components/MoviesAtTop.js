import React from 'react';
import './MoviesAtTop.css';

export default function MoviesAtTop({list}) {

    return (
        <div className=" mt-3 ">
        <h3>Title</h3>
        <ul className="d-flex border container-fluid justify-content-center   mt-4">
          {list.slice(0,5).map((item) => {
            return (
              <li key={item.id} className="border text-start m-2" >
                <div className="" style={{borderBottom:"3px solid orange"}}>
                  <img src={item.imageLink} alt="movie_image" style={{height:350,width:220,objectFit:'cover'}} />
                </div>
                <p className=" fw-bold text-black fs-5"> {item.name}</p>
                <span className="fw-semibold">Release:Februry 15,2022</span>
                <div className=" test" style={{}}>
                  <h5>{item.name}</h5>
                  <span>Release:Februry 15,2002</span><br/>
                  <span>Genre:Cartoon,Sci-fi</span><br/>
                  <span>Duration:02 hours 30 minutes</span><br/>
                  <span>Language:English</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
};
