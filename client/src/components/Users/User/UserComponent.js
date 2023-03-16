import {Link} from "react-router-dom";
import PubComponent from "../../Home/PubComponent";
import './UserComponent.css'
import StarRatings from "react-star-ratings/build/star-ratings";

export default function UserComponent({user}) {
    const responses = user.responses;
    console.log(responses)
    const favoritePubs = user.favoritePubs;

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Link to={'/home/pubs'} className="home-button" >⌂ Home</Link>

            <div className={'userHeader'}>
            <div className={'userInfo'}>
                <h2>{user.username}</h2>
                <div className={'userAvatar'}>{user.avatar}</div>
            </div>
            </div>

            <h1>Улюблені заклади</h1>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                {favoritePubs?.map(favoritePub => <PubComponent pub={favoritePub} key={favoritePub._id}/> )}
            </div>

            <h1>Мої відгуки</h1>
            <div className={'userResponses'}>
                {responses?.map(response => <div className={'userResponse'}>

                    <div>{response.rating }
                    <StarRatings rating={response.rating} starRatedColor="yellow" starDimension={'15'} numberOfStars={5}/>
                    </div>
                        <div>{response.comment}</div>
                    <div>{response.receipt}</div>
                </div>)}
            </div>

            {/*<div>*/}
            {/*    {user.messages}*/}
            {/*</div>*/}
        </div>
    );
}