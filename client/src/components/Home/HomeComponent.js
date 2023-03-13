import {Link} from "react-router-dom";
import {Outlet} from "react-router";

import "./HomeComponent.css"
import LogoutComponent from "../Auth/LogoutComponent";
import {useState} from "react";



export default function HomeComponent() {

    const [selected, setSelected] = useState(null);


    const handleLinkClick = (index) => {
        setSelected(index);
    };


    const links = [
        { label: 'Заклади', to: 'pubs' },
        { label: 'Новини', to: 'tidings' },
        { label: 'Топ', to: 'top' },
    ];

    return (
        <div>
           <div className={'header'}>
              <div className={'drinker'}>
                  <h1>Пиячок</h1>
                  <Link to={'/message'} className={'button'}>Створити/переглянути</Link>
              </div>
               <div className={'but'}>
               <div><Link to={'/user'} className={'button'}>Переглянути<br/>аккаунт</Link></div>
                   <div><LogoutComponent/></div>
               </div>

           </div>

            <hr/>
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