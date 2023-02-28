export default function TidingComponent({tiding}) {
    return (
        <div>
            Опис: {tiding.body}<br/>
            Фото: {tiding.photo}
        </div>
    );
}