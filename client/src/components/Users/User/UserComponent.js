import {Link} from "react-router-dom";
import PubComponent from "../../Home/PubComponent";
import './UserComponent.css'
import StarRatings from "react-star-ratings/build/star-ratings";
import {useState} from "react";
import {createPub} from "../../../Services/pub.service"
import {deleteResponse} from "../../../Services/response.service"
import {deleteUser,updateUser} from "../../../Services/user.service"
import auth from "../../../Services/auth.service";

export default function UserComponent({user}) {
    const responses = user.responses;
    const favoritePubs = user.favoritePubs;

    const [showForm, setShowForm] = useState(false);
    const [showUserForm, setShowUserForm] = useState(false);
    const [buttonName, setButtonName] = useState('Додати заклад');

    const [userEditedName, setUserEditedName] = useState('');
    const [userEditedPhoto, setUserEditedPhoto] = useState('');


    const [pubName, setPubName] = useState('');
    const [adminNumber, setAdminNumber] = useState('');
    const [adminId, setAdminId] = useState('');
    const [pubPhoto, setPubPhoto] = useState('');
    const [pubLocation, setPubLocation] = useState('');
    const [pubOpenTime, setPubOpenTime] = useState('');
    const [pubClosedTime, setPubClosedTime] = useState('');
    const [pubTags, setPubTags] = useState('');
    const [pubAverageCheck, setPubAverageCheck] = useState(0);

    const handleClick = () => {
        setShowForm(!showForm);
        if (buttonName === 'Додати заклад'){
            setButtonName('Закрити форму')
        }else {
            setButtonName('Додати заклад')
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const pub = createPub(pubName,adminNumber,adminId,pubPhoto,pubLocation,pubOpenTime,pubClosedTime,pubTags,pubAverageCheck)
            .catch(error => {
                if (error) {
                    alert(error.response.data.message)
                }})
        if (pub){
            alert(`Заклад відправлено на перевірку `);
            setButtonName('Додати заклад');
            setShowForm(false);
        }
    };

    const deletePubResponse = async (id) => {
        await deleteResponse(id).catch(e => {
            if (e.response.statusText === "Unauthorized") {
                return  auth.refresh(localStorage.getItem('refreshToken'))
            }
            console.log(e.response)
        });
    };

    const deleteUserProfile = async (id) => {
        await deleteUser(id).catch(e => {
            if (e.response.statusText === "Unauthorized") {
                return  auth.refresh(localStorage.getItem('refreshToken'))
            }
            console.log(e.response)
        });
        localStorage.clear()
        window.location.href = '/auth/registration'
    };

    const handleEditClick = () => {
        setShowUserForm(!showUserForm);
    };


    const editUserProfile =  (e) => {
        e.preventDefault();
        let body = {username:userEditedName,photo:userEditedPhoto}
        if(userEditedName === ''){body = {photo:userEditedPhoto}}
        if(userEditedPhoto === ''){body = {username:userEditedName}}
      updateUser(user._id, body).catch(e => {
            if (e.response.statusText === "Unauthorized") {
                return  auth.refresh(localStorage.getItem('refreshToken'))
            }
        });
    };



    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Link to={'/home/pubs'} className="home-button" >⌂ Home</Link>

            <div className={'userHeader'}>
            <div className={'userInfo'}>
                <h2>{user.username}</h2>
                <div className={'userAvatar'}>{user.avatar}</div>
                <br/>
                <div>
                    <button onClick={(e => deleteUserProfile(user._id))}>🗑️</button>
                    <button onClick={handleEditClick}>✏️</button>
                    <br/>
                    {showUserForm && (
                        <div>
                            <form style={{position:"absolute", width: '150px', left:'1%', top: '37%'}} onSubmit={editUserProfile}>
                                <input type={"text"} placeholder={`Ім'я користувача`} onChange={(e) => setUserEditedName(e.target.value)}/>
                                <input type={"text"} placeholder={`Фото користувача`} onChange={(e) => setUserEditedPhoto(e.target.value)}/>
                                <button type={"submit"}>Редагувати</button>
                            </form>
                        </div>)}
                </div>
            </div>
                <div className={'addPub'}>
                    <button onClick={handleClick} className={'button'}>{buttonName}</button>
                </div>
                <div className={'drinker'}>
                    <h1>Пиячок</h1>
                    <Link to={'/message'} className={'button'}>Створити/переглянути</Link>
                </div>

            </div>

            {showForm && (
                <div className="form-wrapper">
                    <p>*заклад буде додано лише після модерації адміністратором</p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Назва закладу:</label>
                        <input type={"text"} onChange={(e) => setPubName(e.target.value)} required/>

                        <label>Номер телефону адміністратора:</label>
                        <input type={"text"} placeholder={'+380970000000'} onChange={(e) => setAdminNumber(e.target.value)} required/>

                        <label>Адміністратор закладу:</label>
                        <input type={"text"}  placeholder={'ID'} onChange={(e) => setAdminId(e.target.value)} required/>

                        <label>Фото закладу:</label>
                        <input type={"text"} onChange={(e) => setPubPhoto(e.target.value)} required/>

                        <label>Адреса закладу:</label>
                        <input type={"text"} onChange={(e) => setPubLocation(e.target.value)} required/>

                        <label>Час відкриття:</label>
                        <input type={"text"} placeholder={'00:00'} onChange={(e) => setPubOpenTime(e.target.value)} required/>

                        <label>Час закриття:</label>
                        <input type={"text"} placeholder={'00:00'} onChange={(e) => setPubClosedTime(e.target.value)} required/>

                        <label>Теги закладу:</label>
                        <input type={"text"} placeholder={'#весілля / #корпоратив / #деньнародження...'} onChange={(e) => setPubTags(e.target.value)} required/>

                        <label>Середній чек в закладі:</label>
                        <input type={"text"} placeholder={'650'} onChange={(e) => setPubAverageCheck(Number(e.target.value))} required/>

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
                    <div><button onClick={(e => deletePubResponse(response._id))}>🗑️</button></div>
                </div>)}
            </div>




            {/*<div>*/}
            {/*    {user.messages}*/}
            {/*</div>*/}
        </div>
    );
}