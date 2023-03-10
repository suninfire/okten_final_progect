import "./PubComponent.css"
import {Link} from "react-router-dom";
import StarRatings from "react-star-ratings/build/star-ratings";


export default function PubComponent({pub}) {

    return (
        <Link to={`/pub/`+pub._id.toString()} class={'link'}> <div className={'pub'}>
            <div className={'name'}><h3>{pub.name}</h3></div>
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