import StarRatings from "react-star-ratings/build/star-ratings";

export default function PubResponseComponent({response}) {
    return (
        <div className={'response'}>
           <div>
               <StarRatings rating={response.rating} starRatedColor="yellow" starDimension={'15'} numberOfStars={5}/>  {response.rating}</div>
            <div>{response.comment}</div>
            <div>{response.receipt}</div>
        </div>
    );
}