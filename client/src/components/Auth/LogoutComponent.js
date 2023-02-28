import auth from "../../Services/auth.service";


export default function LogoutComponent() {
    const handleLogout = async () => {
        try {
            await auth.logout()

        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <button onClick={handleLogout} className={'button'} >Вийти з аккаунту</button>
        </div>
    );
}