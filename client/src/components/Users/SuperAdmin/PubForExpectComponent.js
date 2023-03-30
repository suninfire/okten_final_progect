
export default function PubForExpectComponent({pub}) {
    return (
        <div className={'pub'} style={{paddingLeft:'15px'}}>
            <h3>Адміністратор закладу: {pub.administrator}</h3>
            <h3>Номер телефону адміністратора: {pub.name}</h3>
            <h3>Назва закладу: {pub.name}</h3>
            <h3>Фото закладу: {pub.photo}</h3>
            <h3>Адреса закладу: {pub.location}</h3>
            <h3>Час відкриття закладу: {pub.openTime}</h3>
            <h3>Час закриття закладу: {pub.closeTime}</h3>
            <h3>Теги закладу: {pub.tags}</h3>
            <h3>Середній чек закладу: {pub.averageCheck}</h3>

        </div>
    );
}