import {Link} from "react-router-dom";

export default function UserComponent({user}) {

    return (
        <div>
            <Link to={'/home/pubs'} className="home-button" >⌂ Home</Link>
            User {user.username}
        </div>
    );
}