import {Link} from "react-router-dom";
import {useState} from "react";
import MessageComponent from "./MessageComponent";

export default function DrinkerComponent() {
    const[message,setMessage] = useState(true);

    const handleMessageClose = () => {
        setMessage(false);
    }
    return (
        <div>
            <Link to={'/home/pubs'} className="home-button" >⌂ Home</Link>
            {message ? <MessageComponent onClose={handleMessageClose}/> : (
                'Drinkeeeeer'
            )}
        </div>
    );
}