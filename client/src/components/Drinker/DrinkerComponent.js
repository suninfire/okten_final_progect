import {Link} from "react-router-dom";

export default function DrinkerComponent() {
    return (
        <div>
            <Link to={'/home/pubs'} className="home-button" >⌂ Home</Link>
            Drinker
        </div>
    );
}