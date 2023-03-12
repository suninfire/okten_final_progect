import {useEffect, useState} from "react";
import {getDrinker} from "../../Services/drinker.service";
import auth from "../../Services/auth.service";

export default function UserDrinkerComponent() {

    const [drinkers,setDrinkers]=useState([]);
    const userId = localStorage.getItem('user');

    useEffect(() => {
       getDrinker(userId).then(value => setDrinkers(value.data)).catch(error => {
           if (error.response.statusText === "Unauthorized") {
               return  auth.refresh(localStorage.getItem('refreshToken'))
           }
       });
    },[]);
    return (
        <div>
            {drinkers.map(drinker => <h3>{drinker.criteria}</h3>)}

        </div>
    );
}

