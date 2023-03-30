import {useEffect, useState} from "react";
import auth from "../../../Services/auth.service";
import {getPubsForExpect} from "../../../Services/pub.service";
import PubComponent from "../../Home/PubComponent";
import PubForExpectComponent from "./PubForExpectComponent";

export default function PubsForExpectComponent() {

    const [pubsForExpect,setPubsForExpect] = useState([]);

    useEffect(()=>{
        getPubsForExpect()
            .then(response => setPubsForExpect([...response.data]))
            .catch(error => {
                if (error.response.statusText === "Unauthorized") {
                    return  auth.refresh(localStorage.getItem('refreshToken'))
                }
            });
    },[pubsForExpect]);

    return (
        <div>
            <div className={'pubs'}>
                {
                    pubsForExpect?.map(pub => <PubForExpectComponent pub={pub} key={pub._id}/>)
                }
            </div>
        </div>
    );
}