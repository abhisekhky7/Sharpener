import React, { useEffect, useState } from 'react';
import './Moviepage.css';
import { useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom';
import TicketModal from './TicketModal';

export default function Moviepage() {
    const location = useLocation();
    const movie = location.state?.movie;
    const [showPortal,setPortal] = useState(false);
    const [ticketData,setTicketData]=useState({
        movieName:'',
        time:'',
    })

    console.log("from page",movie);

    const displayOrder = [
        { label: 'Director', key: 'director' },
        { label: 'Genre', key: 'genre' },
        { label: 'Release', key: 'releaseDate' },
        { label: 'Language', key: 'language' },
        { label: 'Rating', key: 'imdbRating' },
    ];

    const handleTicket = (obj)=>{
        setPortal(true)
        setTicketData({movieName:movie.name,time:obj});
    }

    useEffect(()=>{
            setTicketData({
                movieName:'',
                time:'',
            })
    },[])

    return (
        <div className='container d-flex flex-column'>
           
            <div className='border  mt-5 border  d-lg-flex'>
            <div className=' p-2' style={{height:"80vh", width:"30vw"}}>
                <img src={movie.imageLink} alt='...' style={{height:"100%", width:"100%"}} />
            </div>  

            <div className=' ms-3 ps-3 w-75 '>
                <h3 className='mt-1' style={{color:"orange"}}>
                    {movie.name}
                    </h3>
                <span>Length: 02 hours 30 minutes</span>
                <div className='mt-5 '>

                {displayOrder.map(({ label, key }) => (
                    <div key={key} className='fw-semibold d-flex'>
                        <p className='' style={{width:"10%"}}>{`${label}:`}</p>
                        <p className=' '>{` ${movie[key]}`}</p>
                    </div>
                ))}
                </div>

                <div className=''>
                <h3 className=''style={{color:"orange"}}>Synopisis</h3>
                    <p>{movie.description}</p>
                 </div>
                
            </div>
            </div>

            <div className='my-5'>
                <h3>Show Time</h3>
                {movie['showtimes'].map((obj,ind)=><div key={ind} className='d-flex justify-content-between'>
                    <div className='d-flex gap-2'><span>{obj.date}</span><span>{obj.time}</span></div>
                    <button className='btn btn-sm btn-outline-primary my-1' onClick={()=>handleTicket(obj)}>Buy Tickets</button>
                </div>)}
            </div>
            {showPortal && ReactDOM.createPortal(<TicketModal ticketData={ticketData} setPortal={setPortal}/>, document.getElementById('portal'))}

        </div>
    );
};
