import {getPubById} from "../../Services/pub.service";
import {useEffect, useState} from "react";
import {Outlet, useParams} from "react-router";

import './PubProfileComponent.css'
import {Link} from "react-router-dom";
import auth from "../../Services/auth.service";
import {getUser, likePub} from "../../Services/user.service";
import StarRatings from "react-star-ratings/build/star-ratings";

export default function PubProfileComponent() {

    const [pub,setPub] = useState([]);
    const [like,setLike] = useState('');
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
        getUser(userId).then(user => {
            let fav = [];
            const favPubsArr = user.data.favoritePubs;
            for (const favPubsArrElement of favPubsArr) {
                fav.push(favPubsArrElement._id)
            }
            if(fav.includes(pubId) === true){
                setLike('♥')
            }else {
                setLike('♡')
            }
        }).catch(error => {
            if (error.response.statusText === "Unauthorized") {
                return  auth.refresh(localStorage.getItem('refreshToken'))
            }
        });
    });

    return (
        <div className={'main'}>

            <Link to={'/home/pubs'} className="home-button" >⌂ Home</Link>

           <div className={'info'}>
               <div className={'box1'}>
                   <div className={'pubname'}>{pub.name}</div>
                   <div className={'pubphoto'}>{pub.photo}</div>
                   <div className={'location'}>{pub.location}</div>
                   <div className={'contacts'}>{pub.contacts}<button>Написати менеджеру</button></div>
               </div>
               <div className={'box2'}>
                   <div>
                       <button className={`likeButton`} onClick={handleLike}>
                           {like}
                       </button>
                   </div>
                   <div className={'worktime'}>
                       Графік роботи:<br/>{pub.openTime} - {pub.closeTime}</div>
                   <StarRatings rating={pub.rating} starRatedColor="yellow" starDimension={'15'} numberOfStars={5}/>
                   <div className={'pubrating'}>Рейтинг:  {pub.rating}</div>
                   <div className={'avaragecheck'}>Середній чек: {pub.averageCheck} грн</div>
               </div>
           </div>

           <div className={'drinker'}><Link to={'/message'}  class={'drinkerbutton'}><div>Пиячок</div></Link></div>
            <hr/>
            <div className={'newstidings'}>
              <div>
                  <Link to={'tidings'} className={'nd'}>Новини</Link>
                  <Link to={'responses'} className={'nd'}>Відгуки</Link>
              </div>
                <div className={'outlet'}>
                    <Outlet/>
                </div>
            </div>

           <div className={'tags'}>{pub.tags}</div>

        </div>
    );
}