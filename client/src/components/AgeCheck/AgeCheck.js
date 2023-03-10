import "./AgeCheck.css"
import {Link} from "react-router-dom";

export default function AgeCheck() {
    return (
        <div >
            <h1 className={'att'}>Запускаючи цей додаток ви погоджуєтесь,що вам є 18 років</h1>
           <div className={'button'}><Link to={'/auth'} class={'link'}> Так, мені є 18 років</Link></div>
        </div>


    );
}