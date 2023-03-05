import "./PubTidingComponent.css"

export default function PubTidingComponent({tiding}) {
    return (
        <div className={'tiding'}>
            <div><h3>{tiding.body}</h3></div>
            <div>{tiding.photo}</div>
        </div>
    );
}