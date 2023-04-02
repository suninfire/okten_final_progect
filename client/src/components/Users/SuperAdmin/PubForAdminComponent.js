import {deletePub, updatePub} from "../../../Services/pub.service";
import auth from "../../../Services/auth.service";
import {useState} from "react";

export default function PubForAdminComponent({pub}) {

    const [editing, setEditing] = useState(false);

    const [newPubAdministrator, setNewPubAdministrator] = useState(pub.administrator);
    const [newPubContacts, setNewPubContacts] = useState(pub.contacts);
    const [newPubName, setNewPubName] = useState(pub.name);
    const [newPubLocation, setNewPubLocation] = useState(pub.location);
    const [newPubOpenTime, setNewPubOpenTime] = useState(pub.openTime);
    const [newPubCloseTime, setNewPubCloseTime] = useState(pub.closeTime);
    const [newPubTags, setNewPubTags] = useState(pub.tag);
    const [newPubAverageCheck, setNewPubAverageCheck] = useState(pub.averageCheck);
    const [newPubRating, setNewPubRating] = useState(pub.rating);

    const handleEditClick = () => {
        setEditing(!editing);
    };

    const deletePubById = (id) => {
        deletePub(id).catch(e => {
            if (e.response.statusText === "Unauthorized") {
                return  auth.refresh(localStorage.getItem('refreshToken'))
            }
            console.log(e.response)
        });
    };

    const updatePubById = (id) => {
        updatePub(id, newPubAdministrator,newPubContacts,newPubName,newPubLocation,newPubOpenTime,newPubCloseTime,newPubTags,newPubAverageCheck,newPubRating).catch(e => {
            if (e.response.statusText === "Unauthorized") {
                return  auth.refresh(localStorage.getItem('refreshToken'))
            }
            console.log(e.response)
        });
    };

    return (
        <div className={'pubforexpect'} >
            <div className={'photoPub'}>{pub.photo}</div>
            <h3>Адміністратор закладу: {editing ? (
                <input type='text' placeholder={pub.administrator} onChange={(e) => setNewPubAdministrator(e.target.value)} />
            ) : (pub.administrator)}</h3>
            <h3>Номер телефону адміністратора: {editing ? (
                <input type='text' placeholder={pub.contacts} onChange={(e) => setNewPubContacts(e.target.value)} />
            ) : (pub.contacts)}</h3>
            <h3>Назва закладу: {editing ? (
                <input type='text' placeholder={pub.name} onChange={(e) => setNewPubName(e.target.value)} />
            ) : (pub.name)}</h3>
            <h3>Адреса закладу: {editing ? (
                <input type='text' placeholder={pub.location} onChange={(e) => setNewPubLocation(e.target.value)} />
            ) : (pub.location)}</h3>
            <h3>Час відкриття закладу: {editing ? (
                <input type='text' placeholder={pub.openTime} onChange={(e) => setNewPubOpenTime(e.target.value)} />
            ) : (pub.openTime)}</h3>
            <h3>Час закриття закладу: {editing ? (
                <input type='text' placeholder={pub.closeTime} onChange={(e) => setNewPubCloseTime(e.target.value)} />
            ) : (pub.closeTime)}</h3>
            <h3>Теги закладу: {editing ? (
                <input type='text' placeholder={pub.tags} onChange={(e) => setNewPubTags(e.target.value)} />
            ) : (pub.tags)}</h3>
            <h3>Середній чек закладу: {editing ? (
                <input type='text' placeholder={pub.averageCheck} onChange={(e) => setNewPubAverageCheck(e.target.value)} />
            ) : (pub.averageCheck)}</h3>
            <h3>Рейтинг закладу: {editing ? (
                <input type='text' placeholder={pub.rating} onChange={(e) => setNewPubRating(e.target.value)} />
            ) : (pub.rating)}</h3>
            {/*<div>{pub.tidings}</div>*/}
            {/*<div>{pub.responses}</div>*/}
            {editing && <button className={'button'} onClick={() => updatePubById(pub._id)}>Зберегти</button>}
            <div className={'buttons'}>
                <button className={'button'} onClick={handleEditClick}>Редагувати</button>
                <button className={'button'} onClick={() => deletePubById(pub._id)} >Видалити</button>
            </div>
        </div>
    );
}