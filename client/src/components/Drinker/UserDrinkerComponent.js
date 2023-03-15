import {useEffect, useState} from "react";
import {deleteDrinker, getDrinker} from "../../Services/drinker.service";
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
    },[userId]);

    const delDrinker = (id) => {
        deleteDrinker(id).catch(e => {
            if (e.response.statusText === "Unauthorized") {
                return  auth.refresh(localStorage.getItem('refreshToken'))
            }
            console.log(e.response)
        });
    }

    return (
        <div className={'drinkersBox'}>
            {drinkers.map(drinker =>
                <div className={'drinkerBox'}>
                    <div style={{width: '40%'}}><div><h3>📅 {drinker.date} </h3> </div>
                    <div><h3>🕓{drinker.time}</h3> </div>
                    <div> <h3>📍 {drinker.pubName}</h3> </div>
                    <div> <h3>🗺️ {drinker.pubLocation}</h3> </div></div>

                    <div className={'descriptions'}><div style={{textAlign:'center'}}><h3>{drinker.description}</h3> </div>
                  <div style={{textAlign:'center'}}><h4>{drinker.criteria}</h4> </div>
                        <div><button onClick={() => delDrinker(drinker._id)}>Видалити</button></div></div>
                </div>
            )}

        </div>
    );
}

