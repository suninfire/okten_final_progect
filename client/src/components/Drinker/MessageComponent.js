import "./MessageComponent.css"

export default function MessageComponent({onClose}) {
    return (
        <div className={'message'}>
                <div><h1>"Адміністрація застерігає вас бути обережними <br/>і не зустрічатися з незнайомими людьми <br/>в небезпечних чи невідомих вам місцях"</h1></div>
                <div><button className={'button'} onClick={onClose} style={{width:'750px'}}>OK</button></div>
        </div>
    );
}