import React, { useEffect, useState } from 'react';
import './Carausel.css';
import { useSelector } from 'react-redux';

export default function Carausel() {
  const { sliderData, category } = useSelector((state) => state.movie);
  const [list, setList] = useState([]);

  useEffect(() => {
    const data = sliderData.filter((item) => item.name === category);
    const links = data.map((obj) => obj.slider).flat();
    setList(links);
  }, [category, sliderData]);

  return (
    <div>
      <div id="carouselExampleCaptions" className="carousel slide " data-bs-ride="carousel">
        <div className="carousel-indicators">
          {list.map((link, id) => (
            <button
              key={id}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={id}
              className={id === 0 ? 'active' : ''}
              aria-current={id === 0 ? 'true' : 'false'}
              aria-label={`Slide ${id + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {list.map((link, id) => (
            <div key={id} data-bs-interval="2500" className={`carousel-item ${id === 0 ? 'active' : ''}`}>
              <img src={link} className="d-block w-100" alt="..." />
           
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
