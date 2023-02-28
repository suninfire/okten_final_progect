import AuthComponent from "../../components/Auth/AuthComponent";
import {Outlet} from "react-router";

import "./AuthPage.css"

export default function AuthPage() {
    return (
        <div class={'authPage'}>
           <AuthComponent/>
            <Outlet/>
        </div>
    );
}