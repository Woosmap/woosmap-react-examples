import "./StorePreview.css";

export default function StorePreview({
                                         name,
                                     }) {
    return (
        <div>
            <p className="store-name">
                {name}
            </p>
        </div>
    )
}