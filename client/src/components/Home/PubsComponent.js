import {useEffect, useState} from "react";
import {getPubs} from "../../Services/pub.service";
import PubComponent from "./PubComponent";

import "./PubsComponent.css"
import auth from "../../Services/auth.service";


export default function PubsComponent() {

    const [pubs,setPubs] = useState([]);
    const [searchPubs,setSearchPubs] = useState([]);
    const [searchValue, setSearchValue] = useState("");


    useEffect(()=>{
        getPubs()
        .then(response => setPubs([...response.data]))
        .catch(error => {
            if (error.response.statusText === "Unauthorized") {
                return  auth.refresh(localStorage.getItem('refreshToken'))
            }
        });
    },[]);


    const handleSearchSubmit = event => {
        event.preventDefault();
        const filteredPubs = pubs.filter(pub => pub.name.toLowerCase() === searchValue.toLowerCase());
        setSearchPubs(filteredPubs)
    };

    const p = () => {
        if (searchValue){
            return  searchPubs
        }else{
            return pubs
        }
    }

    return (
        <div>
            <div className={'search'}>
                <form onSubmit={handleSearchSubmit}>
                    <input type="search" placeholder={'🔎︎...'} value={searchValue} onChange={event => setSearchValue(event.target.value)}/>
                    <button type="submit">Знайти</button>
                </form>
            </div>

            <div className={'fb'}>
                <div className={'filter'}>Filter:<br/>Sort:</div>

                <div className={'pubs'}>
                    {
                        p().map(pub => <PubComponent pub={pub} key={pub._id}/>)
                    }
                </div>
            </div>

        </div>
    );
}