import {useEffect, useState} from "react";
import {getTidings} from "../../Services/tiding.service";
import auth from "../../Services/auth.service";
import TidingComponent from "./TidingComponent";

export default function TidingsComponent() {

    const [tidings,setTidings] = useState([]);
    const [category,setCategory] = useState([]);

    useEffect(() => {
        getTidings()
            .then(response => setTidings([...response.data]))
            .catch(error => {
                if (error.response.statusText === "Unauthorized") {
                    return  auth.refresh(localStorage.getItem('refreshToken'))
                }
            });
    },[])

    const filter = (category) => {
      setCategory(category)
    }

    let filtered = tidings;
    if(category){
        filtered = tidings.filter(tiding => tiding.category === category)
    }

    return (
        <div>
            <div className={'menu'}>
                <button className={'button'} onClick={()=> filter('акції')}> акції </button>
                <button className={'button'} onClick={()=> filter('загальні')}>загальні</button>
                <button className={'button'}  onClick={()=> filter('події')}> події </button>
            </div>

            <div className={"pubs"}>
                {
                    filtered.map(tiding => <TidingComponent tiding={tiding} key={tiding._id}/>)
                }
            </div>
        </div>
    );
}