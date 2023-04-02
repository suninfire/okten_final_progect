import "./SuperAdminComponent.css"
import {updateExpectPub,deletePub} from "../../../Services/pub.service";
import auth from "../../../Services/auth.service";

export default function PubForExpectComponent({pub}) {

    const expectPub = (id) => {
        updateExpectPub(id, {expect: true}).catch(e => {
            if (e.response.statusText === "Unauthorized") {
                return  auth.refresh(localStorage.getItem('refreshToken'))
            }
            console.log(e.response)
        });
    };

    const noExpect = (id) => {
      deletePub(id).catch(e => {
          if (e.response.statusText === "Unauthorized") {
              return  auth.refresh(localStorage.getItem('refreshToken'))
          }
          console.log(e.response)
      });
    }

    return (
        <div className={'pubforexpect'}>
            <div className={'photoPub'}>{pub.photo}</div>
            <h3>Адміністратор закладу: {pub.administrator}</h3>
            <h3>Номер телефону адміністратора: {pub.contacts}</h3>
            <h3>Назва закладу: {pub.name}</h3>
            <h3>Адреса закладу: {pub.location}</h3>
            <h3>Час відкриття закладу: {pub.openTime}</h3>
            <h3>Час закриття закладу: {pub.closeTime}</h3>
            <h3>Теги закладу: {pub.tags}</h3>
            <h3>Середній чек закладу: {pub.averageCheck}</h3>
            <div className={'buttons'}>
                <button className={'button'} onClick={() => expectPub(pub._id)}>Підтвердити</button>
                <button className={'button'} onClick={() => noExpect(pub._id)}>Відхилити</button>
            </div>
        </div>
    );
}