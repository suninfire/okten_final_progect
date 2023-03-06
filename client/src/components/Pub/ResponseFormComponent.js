import {useState} from "react";
import {useParams} from "react-router";
import {postResponse} from "../../Services/response.service";
import auth from "../../Services/auth.service";

export default function ResponseFormComponent() {

    const {pubId} = useParams()
    const userId = localStorage.getItem('user');
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [receipt, setReceipt] = useState(null);

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleReceiptChange = (e) => {
        // setReceipt(e.target.files[0]);
        setReceipt(e.target.value);
    };

    const handleSubmit = (e) => {
        postResponse(userId,pubId,rating,comment,receipt).catch(error => {
            console.log(error);
            if (error.response.statusText === "Unauthorized") {
                return  auth.refresh(localStorage.getItem('refreshToken'))
            }
        });
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                    <input placeholder={'оцініть заклад від 1 до 5'} value={rating} onChange={handleRatingChange} />
                    <input placeholder={'напишіть ваш відгук'} value={comment} onChange={handleCommentChange} />
                    {/*<input type="file" onChange={handleReceiptChange} />*/}
                    <input placeholder={'додайте фото чеку'} value={rating} onChange={handleReceiptChange} />
                <button type="submit">Залишити відгук</button>
            </form>
        </div>
    );
}