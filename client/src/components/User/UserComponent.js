import {useEffect, useState} from "react";
import {getUser} from "../../Services/user.service";
import auth from "../../Services/auth.service";

export default function UserComponent() {
   const [user,setUser] = useState([]);

   useEffect(() => {
       getUser(localStorage.getItem('user'))
           .then(user => setUser(user.data))
           .catch(error => {
               if (error.response.statusText === "Unauthorized") {
                   return  auth.refresh(localStorage.getItem('refreshToken'))
               }})
   },[])

    return (
        <div>
            {user.username}

        </div>
    );
}