export default function TidingComponent({tiding}) {
    return (
        <div className={'tiding'}>
            Опис: {tiding.body}<br/>
            Фото: {tiding.photo}
        </div>
    );
}