import React from 'react'
import fb from './img/fb.png'
import './Footer.css'

export default function Footer() {
  return (
    <footer>
    <div className="footer-title">
        The Generics
    </div>
    <div className="footer-icons">
        <ul>
            <li><a href="https://www.youtube.com">
                <img src={require("./img/youtube.jpg")} alt="image" style={{height:30,width:30}}/>
            </a></li>
            <li><a href="https://spotify.com">
                <img src={require("./img/spotify.png")} style={{height:30,width:30,background:'black'}} alt="image"/>
            </a></li>
            <li><a href="https://facebook.com">
                <img src={fb} alt="image" style={{height:30,width:30,background:"blue"}} />
            </a></li>
        </ul>
        
    </div>
</footer>
  )
}
