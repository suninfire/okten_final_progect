import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {getResponses} from "../../Services/response.service";
import auth from "../../Services/auth.service";
import PubResponseComponent from "./PubResponseComponent";
import ResponseFormComponent from "./ResponseFormComponent";

import './PubResponsesComponent.css'

export default function PubResponsesComponent() {

    const {pubId} = useParams();
    const [responses,setResponses] = useState([]);

    useEffect(() => {
        getResponses()
            .then(response => setResponses(response.data))
            .catch(error => {
                if (error.response.statusText === "Unauthorized") {
                    return auth.refresh(localStorage.getItem('refreshToken'))
                }
            });
    },[]);

    return (
        <div className={'responseBox'}>
            <div className={'responses'}>
                {responses.map(response => {
                    if(response.pub === pubId){
                        return <PubResponseComponent response={response} key={response._id}/>
                    }
                })}
            </div>
            <div className={'responseForm'}>
                <ResponseFormComponent/>
            </div>

        </div>
    );
}