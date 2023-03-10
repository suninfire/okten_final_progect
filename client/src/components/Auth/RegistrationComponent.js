import {useState} from "react";
import {registrationUser} from "../../Services/user.service";

import "./LogRegComponent.css"

export default function RegistrationComponent() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
         const user = await registrationUser(email, password,username)
            .catch(error => {
                if (error) {
                    alert(error.response.data.message)
                    window.location.href = '/auth/registration'
                }
            })
        if (user){
            alert(`Реєстрація успішна`)
            window.location.href = '/auth/login'
        }
    }

    return (
            <div className={'logreg'}>
                <form onSubmit={handleSubmit}>
                    <div><input type="text" name="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} required/></div>
                    <div><input type="text" name="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required/></div>
                    <div><input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
                    <div><button type={"submit"}>Зареєструватися</button></div>
                </form>
            </div>
    );
}