import {Link} from "react-router-dom";

import './AuthComponent.css'
import {useState} from "react";

export default function AuthComponent() {
    const [selected, setSelected] = useState(null);

    const handleLinkClick = (index) => {
        setSelected(index);
    };

    const links = [
        { label: 'Увійти', to: 'login' },
        { label: 'Зареєструватися', to: 'registration' },
    ];

    return (
        <div class={'logorreg'}>
            {links.map((link, index) => (
                <Link key={index} to={link.to}
                      className={`lin ${selected === index ? 'selected' : ''}`}
                      onClick={() => handleLinkClick(index)}>
                    {link.label}
                </Link>
            ))}
        </div>
    )
}