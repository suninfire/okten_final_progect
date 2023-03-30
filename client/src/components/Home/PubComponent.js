import "./PubComponent.css"
import {Link} from "react-router-dom";
import StarRatings from "react-star-ratings/build/star-ratings";
import {useState,useEffect} from "react";
import {getUser, likePub} from "../../Services/user.service";
import auth from "../../Services/auth.service";


export default function PubComponent({pub}) {

    const userId = localStorage.getItem('user');
    const [like,setLike] = useState('');

    const handleLike = (e) => {
        e.preventDefault()
        likePub(userId,pub._id).catch(e => {
            if (e.response.statusText === "Unauthorized") {
                return  auth.refresh(localStorage.getItem('refreshToken'))
            }
        })
    };

    useEffect(()=>{
        getUser(userId).then(user => {
            let fav = [];
            const favPubsArr = user.data.favoritePubs;
            for (const favPubsArrElement of favPubsArr) {
                fav.push(favPubsArrElement._id)
            }
            if(fav.includes(pub._id) === true){
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
        <Link to={`/pub/`+pub._id.toString()} class={'link'}> <div className={'pub'}>

            <div className={'name'}>
                <h3>{pub.name}</h3>
                <button className={'likeButton'} onClick={handleLike}>
                    {like}
                </button>

                <Link to={'/message'} className={'button'} style={{height: '25px'}}>Пиячок</Link>

                </div>
            <div className={'box'}>

                <div className={'photo'}>photo</div>
                <div className={'rating'}>
                    <div>
                        <StarRatings rating={pub.rating} starRatedColor="yellow" starDimension={'15'} numberOfStars={5}/>
                        Рейтинг:  {pub.rating}
                    </div>
                    <div>
                        Графік роботи:<br/>{pub.openTime} - {pub.closeTime}
                    </div>
                    <div>Середній чек: {pub.averageCheck} грн</div>
                </div>
            </div>
            <div className={'location'}>
                <h4>{pub.location}</h4>
            </div>
        </div>
        </Link>
    );
}