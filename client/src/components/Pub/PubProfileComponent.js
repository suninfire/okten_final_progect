import {getPubById} from "../../Services/pub.service";
import {useEffect, useState} from "react";
import {Outlet, useParams} from "react-router";

import './PubProfileComponent.css'
import {Link} from "react-router-dom";
import auth from "../../Services/auth.service";
import {getUser} from "../../Services/user.service";

export default function PubProfileComponent() {

    const token = localStorage.getItem('accessToken')
    const [pub,setPub] = useState([]);
    const {pubId} = useParams();


    const handleLike = () => {
        let userId = localStorage.getItem('user')
        getUser(userId).then(user => console.log(user))
    };

    useEffect(()=>{
        getPubById(pubId,token)
            .then(pub => setPub(pub.data))
            .catch(error => {
                if (error.response.statusText === "Unauthorized") {
                    return  auth.refresh(localStorage.getItem('refreshToken'))
                }
            });
    });

    return (
        <div class={'main'}>

           <div class={'info'}>
               <div class={'box1'}>
                   <div class={'pubname'}>{pub.name}</div>
                   <div class={'pubphoto'}>{pub.photo}</div>
                   <div class={'location'}>{pub.location}</div>
                   <div class={'contacts'}>{pub.contacts}<button>Написати менеджеру</button></div>
               </div>
               <div class={'box2'}>
                   <div class={'likes'}>
                       <button className={`like-button`} onClick={handleLike}>
                           Like
                       </button>
                   </div>
                   <div class={'worktime'}>
                       Графік роботи:<br/>{pub.openTime} - {pub.closeTime}</div>
                   <div class={'pubrating'}>{pub.rating}</div>
                   <div class={'avaragecheck'}>Середній чек: {pub.averageCheck} грн</div>
               </div>
           </div>

           <div class={'drinker'}><Link to={'/drinker'} class={'drinkerbutton'}><div>Пиячок</div></Link></div>
            <hr/>
            <div class={'newstidings'}>
              <div>
                  <Link to={'tidings'} class={'nd'}>Новини</Link>
                  <Link to={'responses'}class={'nd'}>Відгуки</Link>
              </div>
                <div>
                    <Outlet/>
                </div>
            </div>

           <div class={'tags'}>{pub.tags}</div>

        </div>
    );
}