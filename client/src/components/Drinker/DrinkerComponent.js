import {Link} from "react-router-dom";
import {Outlet} from "react-router";
import {useState} from "react";

import './DrinkerComponent.css'

export default function DrinkerComponent() {

    const [selected, setSelected] = useState(null);


    const handleLinkClick = (index) => {
        setSelected(index);
    };


    const links = [
        { label: 'Створити', to: 'create' },
        { label: 'Приєднатися', to: 'join' },
        { label: 'Мій пиячок', to: 'myDrinker' },
    ];


    return (
        <div className={'drinkermain'}>
            <Link to={'/home/pubs'} className="home-button" >⌂ Home</Link>
                <div className={'drinkermenu'}>
                    {links.map((link, index) => (
                        <Link to={link.to}
                              className={`lin ${selected === index ? 'selected' : ''}`}
                              onClick={() => handleLinkClick(index)} key={index}>{link.label}
                        </Link>
                    ))}
                </div>
            <Outlet/>
        </div>
    );
}