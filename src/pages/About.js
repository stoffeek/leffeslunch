import React from "react";
import './About.css';
import aboutUs from './img/about_us.png'
import aboutTxt from './img/about_txt.png';

const About = () => {
    return (
        <div className="about-container">
            <img src={aboutUs} alt="About Us" className="about-us" />
            <img src={aboutTxt} alt="About Text" className="about-txt" />
        </div>
    );
}

export default About;