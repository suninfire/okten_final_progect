export default function PubTidingComponent({tiding}) {
    return (
        <div>
            {tiding.body}
            {tiding.category}
        </div>
    );
}