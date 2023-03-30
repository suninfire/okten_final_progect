import {useEffect, useState} from "react";
import {getPubs} from "../../../Services/pub.service";
import auth from "../../../Services/auth.service";
import PubComponent from "../../Home/PubComponent";

export default function AllPubsComponent() {

    const [pubs,setPubs] = useState([]);

    useEffect(()=>{
        getPubs()
            .then(response => setPubs([...response.data]))
            .catch(error => {
                if (error.response.statusText === "Unauthorized") {
                    return  auth.refresh(localStorage.getItem('refreshToken'))
                }
            });
    },[pubs]);

    return (
        <div>
            <div className={'pubs'}>
                {
                    pubs.map(pub => <PubComponent pub={pub} key={pub._id}/>)
                }
            </div>
        </div>
    );
}