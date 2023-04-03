import {deleteUser,updateUser} from "../../../Services/user.service";
import auth from "../../../Services/auth.service";
import {useState} from "react";

export default function SAUserComponent({user}) {

    const [editing, setEditing] = useState(false);

    const [newUserEmail, setNewUserEmail] = useState(user.email);
    const [newUserName, setNewUserName] = useState(user.username);
    const [newUserStatus, setNewUserStatus] = useState(user.administrator);
    const [newUserPub, setNewUserPub] = useState(user.pub);
    const [newUserPubContact, setNewUserContact] = useState(user.adminPhone);

    const handleEditClick = () => {
        setEditing(!editing);
    };

    const admin = (isAdmin) => {
        if (isAdmin === true){
            return "Так"
        }else {
            return "Ні"
        }
    }

    const deleteUserProfile = async () => {
        await deleteUser(user._id).catch(e => {
            if (e.response.statusText === "Unauthorized") {
                return  auth.refresh(localStorage.getItem('refreshToken'))
            }
            console.log(e.response)
        });
    };

    const updateUserById =  (id) => {
        let status;
        if(newUserStatus === "Так" || true ){status = true}
        if(newUserStatus === "Ні" || false ){status = false}
      updateUser(id,
          {
              username: newUserName,
              email: newUserEmail,
              administrator: status,
              pub: newUserPub,
              adminPhone: newUserPubContact
          }).catch(e => {
          if (e.response.statusText === "Unauthorized") {
              return  auth.refresh(localStorage.getItem('refreshToken'))
          }
          console.log(e.response)
      });
    }

    return (
        <div className={'userbox'}>
            <div className={'butandphoto'}>
                <div className={'userAvatar'} style={{border:'1px solid black'}}>{user.avatar}</div>
                <div><button className={'button'} onClick={handleEditClick}>Редагувати</button></div>
                <div><button className={'button'} onClick={deleteUserProfile}>Видалити</button></div>
            </div>

            <div className={'usersInfo'}>
                    <div><h4>ІD: {user._id}</h4></div>

                    <div><h4>Email: {editing ? (
                        <input type='text' placeholder={user.email} onChange={(e) => setNewUserEmail(e.target.value)} />
                    ) : (user.email)}</h4></div>

                    <div><h4>Ім'я: {editing ? (
                        <input type='text' placeholder={user.username} onChange={(e) => setNewUserName(e.target.value)} />
                    ) : (user.username)}</h4></div>

                    <div><h4>Адміністратор:  {editing ? (
                        <input type='text' placeholder={admin(user.administrator)} onChange={(e) => setNewUserStatus(e.target.value)} />
                    ) : (admin(user.administrator))}</h4></div>
                {user.administrator && (
                    <div><h4>Заклад: {editing ? (
                        <input type='text' placeholder={user.pub} onChange={(e) => setNewUserPub(e.target.value)} />
                    ) : (user.pub)}</h4><h4>Номер телефону: {editing ? (
                        <input type='text' placeholder={user.adminPhone} onChange={(e) => setNewUserContact(e.target.value)} />
                    ) : (user.adminPhone)}</h4></div>
                    )}
                {editing && (<button className={'button'} onClick={() => updateUserById(user._id)}>Зберегти</button>)}
                    </div>
        </div>
    );
}