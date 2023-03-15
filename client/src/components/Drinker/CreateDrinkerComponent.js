import {useState,useEffect} from "react";
import {createDrinker} from "../../Services/drinker.service";
import {getPubs} from "../../Services/pub.service";
import auth from "../../Services/auth.service";



export default function CreateDrinkerComponent() {

    const [pubs,setPubs] = useState([])
    const [pub, setPub] = useState('');
    const meetOwner = localStorage.getItem('user');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [criteria, setCriteria] = useState('');


    useEffect(()=>{
        getPubs()
            .then(pub => setPubs(pub.data))
            .catch(error => {
                if (error.response.statusText === "Unauthorized") {
                    return  auth.refresh(localStorage.getItem('refreshToken'))
                }
            });

    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const drinker = await createDrinker(pub,meetOwner,date,time,description,criteria)
            .catch(error => {
                if (error) {
                    alert(error.response.data.message)
                }
            })
        if (drinker){
            window.location.href = '/drinker/myDrinker'
        }
    }



    return (
        <div className={'logreg'}>
            <form onSubmit={handleSubmit}>
                <div><select  name="pub" value={pub} onChange={(e) => setPub(e.target.value)} required>
                    <option value="">Оберіть заклад:</option>
                    {pubs.map((pub, index) => (
                        <option key={index} value={pub._id}>{pub.name}</option>))}
                </select></div>
                <div><input type="text" name="date" placeholder="дд.мм.рр" value={date} onChange={(e) => setDate(e.target.value)} required /></div>
                <div><input type="text" name="time" placeholder="00:00" value={time} onChange={(e) => setTime(e.target.value)} required /></div>
                <div><input type="text" name="description" placeholder="опис" value={description} onChange={(e) => setDescription(e.target.value)} required /></div>
                <div><input type="text" name="criteria" placeholder="критерії" value={criteria} onChange={(e) => setCriteria(e.target.value)} required /></div>
                <div><button type={"submit"}>Створити</button></div>
            </form>
            <div style={{width: '400px', margin:'30px'}}>* для створення ' Пиячка ' оберіть заклад,дату та час. У полі ' опис ' опишіть мету зустрічі,тощо. У полі ' критерії ' вкажіть стать, кількість людей в компанії, хто оплачує та бажану суму витрат </div>
        </div>
    );
}