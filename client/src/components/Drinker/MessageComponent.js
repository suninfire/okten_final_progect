import "./MessageComponent.css"
import {Link} from "react-router-dom";

export default function MessageComponent() {

    return (
        <div className={'message'}>
                <div><h1>"Адміністрація застерігає вас бути обережними <br/>і не зустрічатися з незнайомими людьми <br/>в небезпечних чи невідомих вам місцях"</h1></div>
                <div><Link to={'/drinker'} className={'button'} style={{width:'750px',cursor: 'pointer'}}>OK</Link></div>
        </div>
    );
}