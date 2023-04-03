import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {deleteResponse} from "../../../Services/response.service";
import auth from "../../../Services/auth.service";
import {deleteUser, updateUser} from "../../../Services/user.service";
import PubComponent from "../../Home/PubComponent";
import StarRatings from "react-star-ratings/build/star-ratings";
import {getPubById} from "../../../Services/pub.service";
import AdminPubComponent from "./AdminPubComponent";

export default function AdminComponent({user}) {

    const pubsIds = user.pub;
    const responses = user.responses;
    const favoritePubs = user.favoritePubs;

    const [pubs, setPubs] = useState([]);

    const [showUserForm, setShowUserForm] = useState(false);

    const [userEditedName, setUserEditedName] = useState(user.username);
    const [userEditedPhoto, setUserEditedPhoto] = useState(user.avatar);
    const [userEditedNumber, setUserEditedNumber] = useState(user.adminPhone);


    useEffect(() => {
        for (const pubId of pubsIds) {
            let pubs = [];
            getPubById(pubId)
                .then(pub => pubs.push(pub.data))
                .catch(error => {
                    if (error.response.statusText === "Unauthorized") {
                        return  auth.refresh(localStorage.getItem('refreshToken'))
                    }
                });
            setPubs(pubs);
        }

    },[])




    const deleteAdminResponse = async (id) => {
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
        updateUser(user._id, {username: userEditedName, avatar: userEditedPhoto, adminPhone: userEditedNumber}).catch(e => {
            if (e.response.statusText === "Unauthorized") {
                return  auth.refresh(localStorage.getItem('refreshToken'))
            }
            console.log(e.response)
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
                                    <input type={"text"} placeholder={user.username} onChange={(e) => setUserEditedName(e.target.value)}/>
                                    <input type={"text"} placeholder={user.avatar} onChange={(e) => setUserEditedPhoto(e.target.value)}/>
                                    <input type={"text"} placeholder={user.adminPhone} onChange={(e) => setUserEditedNumber(e.target.value)}/>
                                    <button type={"submit"}>Редагувати</button>
                                </form>
                            </div>)}
                    </div>
                </div>

                <div className={'drinker'}>
                    <h1>Пиячок</h1>
                    <Link to={'/message'} className={'button'}>Створити/переглянути</Link>
                </div>

            </div>


            <h1>Мої заклади</h1>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                {pubs?.map(pub => <AdminPubComponent pub={pub} key={pub._id}/> )}
            </div>

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
                    <div><button onClick={(e => deleteAdminResponse(response._id))}>🗑️</button></div>
                </div>)}
            </div>




            {/*<div>*/}
            {/*    {user.messages}*/}
            {/*</div>*/}
        </div>
    );
}