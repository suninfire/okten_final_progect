import {useEffect, useState} from "react";

import auth from "../../Services/auth.service";
import {getUser} from "../../Services/user.service";
import AdminComponent from "../../components/Users/Admin/AdminComponent";
import SuperAdminComponent from "../../components/Users/SuperAdmin/SuperAdminComponent";
import UserComponent from "../../components/Users/User/UserComponent";


export default function UserPage() {

    const [user,setUser] = useState([]);

    useEffect(() => {
        getUser(localStorage.getItem('user'))
            .then(user => setUser(user.data))
            .catch(error => {
                if (error.response.statusText === "Unauthorized") {
                    return  auth.refresh(localStorage.getItem('refreshToken'))
                }})
    },[user]);

    const page = () => {
        if(user.email === 'n.suninfire@gmail.com'){
        return <SuperAdminComponent user={user} key={user._id}/>
    }else if(user.administrator === true){
        return  <AdminComponent user={user} key={user._id}/>
    }else {
        return  <UserComponent user={user} key={user._id}/>
    }
    }


    return (
        <div>
            {page()}
        </div>
    );
}