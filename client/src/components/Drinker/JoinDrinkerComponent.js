import {useEffect, useState} from "react";
import {getDrinkers} from "../../Services/drinker.service";
import auth from "../../Services/auth.service";

export default function JoinDrinkerComponent() {

    const [drinkers,setDrinkers] = useState([]);
    const user = localStorage.getItem('user');

    useEffect(() => {
        getDrinkers().then(value => setDrinkers(value.data)).catch(error => {
            if (error.response.statusText === "Unauthorized") {
                return  auth.refresh(localStorage.getItem('refreshToken'))
            }
        });
    },[drinkers]);

    return (
        <div className={'drinkersBox'}>
            {drinkers?.map(drinker => { if(drinker.meetOwner !== user) {
               return <div className={'drinkerBox'}>
                    <div style={{width: '40%'}}><div><h3>📅 {drinker.date} </h3> </div>
                        <div><h3>🕓{drinker.time}</h3> </div>
                        <div> <h3>📍 {drinker.pubName}</h3> </div>
                        <div> <h3>🗺️ {drinker.pubLocation}</h3> </div></div>

                    <div className={'descriptions'}><div style={{textAlign:'center'}}><h3>{drinker.description}</h3> </div>
                        <div style={{textAlign:'center'}}><h4>{drinker.criteria}</h4> </div>
                        <div><button> ✉Написати організатору </button> </div></div>
                </div>}}
            )}

        </div>
    );
}