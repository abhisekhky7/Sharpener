import React, { useRef } from "react";
import Slider from "react-slick";
import "./BrowseMovie.css";
import { Link } from "react-router-dom";

export default function BrowseMovie({ movies }) {
  const sliderRef = useRef(null);
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 7,
    speed: 500,
    focusOnSelect: true,
    arrows:false,
    autoplay:true,
    autoplaySpeed:1500,
  };

  return (
    <div className="slider-container my-5" style={{width:"100vw",}}>
      <h3 className="my-5 title">Browse Movie</h3>
      <Slider ref={sliderRef} {...settings}>
  {movies.map((item) => (
    <div key={item.id}>
      <div className="movie-container">
      <Link to={{ pathname: '/moviepage' }} state={{ movie:item }}>  
       <img src={item.imageLink} alt={item.name} /></Link>   
        <h4 className="text-center info title">{item.name}</h4>
      </div>
    </div>
  ))}
</Slider>
<button className="prev-btn" onClick={() => sliderRef.current.slickPrev()}>Prev</button>
      <button className="next-btn" onClick={() => sliderRef.current.slickNext()}>Next</button>
    </div>
  );
}
