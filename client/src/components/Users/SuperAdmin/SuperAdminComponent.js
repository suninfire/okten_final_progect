import {Link} from "react-router-dom";
import {useState} from "react";
import {Outlet} from "react-router";

export default function SuperAdminComponent({user}) {
    const [selected, setSelected] = useState(null);

    const handleLinkClick = (index) => {
        setSelected(index);
    };

    const links = [
        { label: 'Заклади', to: 'pubs' },
        { label: 'Очікують', to: 'pubsForExpect' },
        { label: 'Користувачі', to: 'users' },
    ];

    return (
        <div>
            <Link to={'/home/pubs'} className="home-button" >⌂ Home</Link>
            <div className={'menu'}>
                {links.map((link, index) => (
                    <Link to={link.to}
                          className={`lin ${selected === index ? 'selected' : ''}`}
                          onClick={() => handleLinkClick(index)}>{link.label}
                    </Link>
                ))}
            </div>
            <hr/>
            <Outlet/>
        </div>
    );
}