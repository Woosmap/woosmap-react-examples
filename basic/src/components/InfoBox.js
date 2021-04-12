import "./InfoBox.css";

const Infobox = ({store}) => {
    if (!store) {
        return (<div className="infoBox">Click on a Store Marker...</div>);
    }
    return (
        <div className='infoBox' id={`infobox-${store.properties.store_id}`}>
            <div className="infoBox__storeName">{store.properties.name}</div>
            {store.properties.address && <div>
                <h4 className="infoBox__addressTitle">Address</h4>
                <div className="infoBox__addressLines">{store.properties.address.lines}</div>
                <div className="infoBox__addressCity">{store.properties.address.city}</div>
            </div>}
            {store.properties.contact && <div>
                <h4 className="infoBox__contactTitle">Contact</h4>
                <div className="infoBox__contactPhone">{store.properties.contact.phone}</div>
                <div className="infoBox__contactWebsite"><a href={store.properties.contact.website} target='_blank'>go
                    to website</a>
                </div>
            </div>}
        </div>
    );
};
export default Infobox;