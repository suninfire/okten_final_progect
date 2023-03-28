import {Link} from "react-router-dom";
import PubComponent from "../../Home/PubComponent";
import './UserComponent.css'
import StarRatings from "react-star-ratings/build/star-ratings";
import {useState} from "react";
import {registrationUser} from "../../../Services/user.service";

export default function UserComponent({user}) {
    const responses = user.responses;
    const favoritePubs = user.favoritePubs;

    const [showForm, setShowForm] = useState(false);
    const [buttonName, setButtonName] = useState('Додати заклад');
    const [pubName, setPubName] = useState('');
    const [adminId, setAdminId] = useState('');
    const [adminNumber, setAdminNumber] = useState('');
    const [pubPhoto, setPubPhoto] = useState('');
    const [pubLocation, setPubLocation] = useState('');
    const [pubOpenTime, setPubOpenTime] = useState('');
    const [pubClosedTime, setPubClosedTime] = useState('');

    const handleClick = () => {
        setShowForm(!showForm);
        if (buttonName === 'Додати заклад'){
            setButtonName('Закрити форму')
        }else {
            setButtonName('Додати заклад')
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
    }


    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Link to={'/home/pubs'} className="home-button" >⌂ Home</Link>

            <div className={'userHeader'}>
            <div className={'userInfo'}>
                <h2>{user.username}</h2>
                <div className={'userAvatar'}>{user.avatar}</div>
            </div>
                <div className={'addPub'}>
                    <button onClick={handleClick} className={'button'}>{buttonName}</button>
                </div>

            </div>

            {showForm && (
                <div className="form-wrapper">
                    <p>*заклад буде додано лише після модерації адміністратором</p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Назва закладу:</label>
                        <input type={"text"} onChange={(e) => setPubName(e.target.value)} required/>

                        <label>Адміністратор закладу:</label>
                        <input type={"text"}  placeholder={'ID'} onChange={(e) => setAdminId(e.target.value)} required/>

                        <label>Номер телефону адміністратора:</label>
                        <input type={"text"} placeholder={'+380970000000'} onChange={(e) => setAdminNumber(e.target.value)} required/>

                        <label>Фото закладу:</label>
                        <input type={"text"} onChange={(e) => setPubPhoto(e.target.value)} required/>

                        <label>Адреса закладу:</label>
                        <input type={"text"} onChange={(e) => setPubLocation(e.target.value)} required/>

                        <label>Час відкриття:</label>
                        <input type={"text"} placeholder={'00:00'} onChange={(e) => setPubOpenTime(e.target.value)} required/>

                        <label>Час закриття:</label>
                        <input type={"text"} placeholder={'00:00'} onChange={(e) => setPubClosedTime(e.target.value)} required/>

                        <button type={"submit"}>Створити</button>
                    </form>
                </div>
            )}

            <h1>Улюблені заклади</h1>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                {favoritePubs?.map(favoritePub => <PubComponent pub={favoritePub} key={favoritePub._id}/> )}
            </div>

            <h1>Мої відгуки</h1>
            <div className={'userResponses'}>
                {responses?.map(response => <div className={'userResponse'}>

                    <h3>{response.pubName}</h3>
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