import "./StorePreview.css";

export default function StorePreview({name, address}) {
    return (
        <div className="storePreview">
            <div className="storePreview__storeName">
                {name}
            </div>
            {address &&
            <div className="storePreview__storeAddressLines">
                {address.lines}
            </div>
            }
        </div>
    )
}