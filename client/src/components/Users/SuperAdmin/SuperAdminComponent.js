import {Link} from "react-router-dom";

export default function SuperAdminComponent({user}) {
    return (
        <div>
            <Link to={'/home/pubs'} className="home-button" >⌂ Home</Link>
            SuperAdmin {user.username}
        </div>
    );
}