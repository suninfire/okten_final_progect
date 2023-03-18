import './LogRegComponent.css'
import {useState} from "react";

import auth from "../../Services/auth.service"

export default function LoginComponent() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await auth.login(email, password)
            .catch(error => {
                if (error) {
                    alert(error.response.data.message)
                }
            })

        localStorage.setItem('accessToken', response.access_token);
        localStorage.setItem('refreshToken', response.refresh_token);
        localStorage.setItem('user', response.user);
        window.location.href = '/home/pubs'
    }

    return (
            <div className={'logreg'}>
                <form onSubmit={handleSubmit}>
                    <div><input type="text" placeholder="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/></div>
                    <div><input type="password" placeholder="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/></div>
                    <div><button type={"submit"}>Увійти</button></div>
                </form>
            </div>
    )
}