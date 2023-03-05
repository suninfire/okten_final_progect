import {useEffect, useState} from "react";
import {getTidings} from "../../Services/tiding.service";
import PubTidingComponent from "./PubTidingComponent";
import {useParams} from "react-router";
import auth from "../../Services/auth.service";

export default function PubTidingsComponent() {
    const {pubId} = useParams();
    const [tidings,setTidings] = useState([]);

    useEffect(()=>{
        getTidings()
            .then(tiding => setTidings(tiding.data))
            .catch(error => {
                if (error.response.statusText === "Unauthorized") {
                    return  auth.refresh(localStorage.getItem('refreshToken'))
                }
            });
    },[]);



    return (
        <div className={'tidingbox'}>
            {tidings.map(tiding => {
                if(tiding.pub === pubId){
                    return <PubTidingComponent tiding={tiding} key={tiding._id}/>} })}
        </div>
    );
}