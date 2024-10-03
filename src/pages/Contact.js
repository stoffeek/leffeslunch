import React from "react";
import './Contact.css';
import kevinImage from './img/kevin.jpg';
import arvidImage from './img/arvid.jpg';
import lillyImage from './img/lilly.jpg';
import stoffeImage from './img/stoffe.jpg';
import paoImagine from './img/paulina.jpg';


const developers = [
    {
        name: 'Kevin Vikander',
        role: 'Head of the "Lets take a break" department',
        email: 'kevin.vikander@pelicans.com',
        image: kevinImage
    },
    {
        name: 'Arvid Jannhov',
        role: 'Cocaine addict',
        email: 'arvid.jannhov@pelicans.com',
        image: arvidImage
    },
    {
        name: 'Lilly Wong',
        role: 'Professional planner',
        email: 'lilly.wong@pelicans.com',
        image: lillyImage
    },
    {
        name: 'Christoffer Ek',
        role: 'Company cert. car-crasher',
        email: 'stoffe.ek@pelicans.com',
        image: stoffeImage
    },
    {
        name: 'Paulina Ferrada',
        role: 'Head UX-designer',
        email: 'Paufer@pelicans.com',
        image: paoImagine
    }
]

const Contact = () => {
    return (
        <div className="contact-container">
            <h2>Meet the amazing team behind 'The Pelicans INC.'</h2>
            <div className="team-grid">
                {developers.map((developer, index) => (
                    <div key={index} className="team-member">
                        <img src={developer.image} alt={developer.name} className="profile-pic" />
                        <h3>{developer.name}</h3>
                        <p>{developer.role}</p>
                        <a href={`mailto:${developer.email}`}>{developer.email}</a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Contact;