import {Link} from "react-router-dom";

export default function AdminComponent({user}) {
    return (
        <div>
            <Link to={'/home/pubs'} className="home-button" >⌂ Home</Link>
            Admin {user.username}
        </div>
    );
}