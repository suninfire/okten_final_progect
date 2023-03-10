import {useState} from "react";
import PubComponent from "./PubComponent";
import {useEffect} from "react";
import {getPubs} from "../../Services/pub.service";
import auth from "../../Services/auth.service";

export default function TopComponent() {

    const [eventType, setEventType] = useState('');
    const [pubs,setPubs] = useState([]);
    const [fpubs,setFpubs] = useState([]);

    useEffect(()=>{
        getPubs()
            .then(pub => setPubs([...pub.data.sort((a,b)=>b.rating-a.rating)]))
            .catch(error => {
                if (error.response.statusText === "Unauthorized") {
                    return  auth.refresh(localStorage.getItem('refreshToken'))
                }
            });
        const filteredPubs = pubs.filter(pub => pub.tags.includes(eventType))
        setFpubs(filteredPubs)
    },[eventType,pubs]);

    const handleEventTypeChange = (event) => {
        event.preventDefault()
        setEventType(event.target.value);
        };

    let arr = fpubs;
    if (eventType === ''){
        arr = pubs;
    }


    return (
        <div>
            <div>
                Найкращий заклад для...
                <select value={eventType} onChange={handleEventTypeChange}>
                    <option value="#корпоратив">Корпоративу</option>
                    <option value="#деньнародження">Дня народження</option>
                    <option value="#весілля">Весілля</option>
                </select>
                <div className={'pubs'}>
                    {
                        arr.map(pub => <PubComponent pub={pub} key={pub._id}/>)
                    }
                </div>

            </div>
        </div>
    );
}