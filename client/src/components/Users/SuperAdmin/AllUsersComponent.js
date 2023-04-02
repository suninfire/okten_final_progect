import {useEffect, useState} from "react";
import {getUsers} from "../../../Services/user.service";
import auth from "../../../Services/auth.service";
import SAUserComponent from "./SAUserComponent";

export default function AllUsersComponent() {

    const [users,setUsers] = useState();

    useEffect(()=> {
        getUsers().then(response => setUsers([...response.data]))
            .catch(error => {
                if (error.response.statusText === "Unauthorized") {
                    return  auth.refresh(localStorage.getItem('refreshToken'))
                }
            });
    },[])

    return (
        <div className={'usersBox'}>
            {
                users?.map(user => <SAUserComponent user={user} key={user._id}/>)
            }
        </div>
    );
}