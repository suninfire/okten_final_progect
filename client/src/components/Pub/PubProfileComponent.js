import {getPubById} from "../../Services/pub.service";
import {useEffect, useState} from "react";
import {Outlet, useParams} from "react-router";

import './PubProfileComponent.css'
import {Link} from "react-router-dom";
import auth from "../../Services/auth.service";
import {likePub} from "../../Services/user.service";
import StarRatings from "react-star-ratings/build/star-ratings";

export default function PubProfileComponent() {

    const [pub,setPub] = useState([]);
    const {pubId} = useParams();
    const userId = localStorage.getItem('user');

    const handleLike = (e) => {
        e.preventDefault()
        likePub(userId,pubId).catch(e => {
            if (e.response.statusText === "Unauthorized") {
                return  auth.refresh(localStorage.getItem('refreshToken'))
            }
        })
    };

    useEffect(()=>{
        getPubById(pubId)
            .then(pub => setPub(pub.data))
            .catch(error => {
                if (error.response.statusText === "Unauthorized") {
                    return  auth.refresh(localStorage.getItem('refreshToken'))
                }
            });
    });

    return (
        <div class={'main'}>

            <Link to={'/home/pubs'} className="home-button" >⌂ Home</Link>

           <div class={'info'}>
               <div class={'box1'}>
                   <div class={'pubname'}>{pub.name}</div>
                   <div class={'pubphoto'}>{pub.photo}</div>
                   <div class={'location'}>{pub.location}</div>
                   <div class={'contacts'}>{pub.contacts}<button>Написати менеджеру</button></div>
               </div>
               <div class={'box2'}>
                   <div>
                       <button className={`likeButton`} onClick={handleLike}>
                           ♡
                       </button>
                   </div>
                   <div class={'worktime'}>
                       Графік роботи:<br/>{pub.openTime} - {pub.closeTime}</div>
                   <StarRatings rating={pub.rating} starRatedColor="yellow" starDimension={'15'} numberOfStars={5}/>
                   <div class={'pubrating'}>Рейтинг:  {pub.rating}</div>
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
                <div className={'outlet'}>
                    <Outlet/>
                </div>
            </div>

           <div class={'tags'}>{pub.tags}</div>

        </div>
    );
}