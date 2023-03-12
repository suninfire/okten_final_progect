import {Link} from "react-router-dom";
import {Outlet} from "react-router";
import {useState} from "react";

import './DrinkerComponent.css'
import MessageComponent from "./MessageComponent";

export default function DrinkerComponent() {
    const[message,setMessage] = useState(true);
    const userId = localStorage.getItem('user');
    const [selected, setSelected] = useState(0);


    const handleLinkClick = (index) => {
        setSelected(index);
    };

    const links = [
        { label: 'Створити', to: 'create' },
        { label: 'Приєднатися', to: 'join' },
        { label: 'Мій пиячок', to: 'myDrinker' },
    ];

    const handleMessageClose = () => {
        setMessage(false);
    }
    return (
        <div className={'drinkermain'}>
            <Link to={'/home/pubs'} className="home-button" >⌂ Home</Link>
            {message ? <MessageComponent onClose={handleMessageClose}/> : (
                <div className={'drinkermenu'}>
                    {links.map((link, index) => (
                        <Link to={link.to}
                              className={`lin ${selected === index ? 'selected' : ''}`}
                              onClick={() => handleLinkClick(index)} key={index}>{link.label}
                        </Link>
                    ))}
                </div>
            )}
            <Outlet/>
        </div>
    );
}