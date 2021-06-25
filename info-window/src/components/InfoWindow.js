import "./InfoWindow.css";

const InfoWindow = ({store}) => {
    return (
        <div className='infoBox'>
            <div className="infoBox__storeName">{store.name}</div>
            {store.address && <div>
                <h4 className="infoBox__addressTitle">Address</h4>
                <div className="infoBox__addressLines">{store.address.lines}</div>
                <div className="infoBox__addressCity">{store.address.city}</div>
            </div>}
            {store.contact && <div>
                <h4 className="infoBox__contactTitle">Contact</h4>
                <div className="infoBox__contactPhone">{store.contact.phone}</div>
                <div className="infoBox__contactWebsite"><a href={store.contact.website} target='_blank'>go
                    to website</a>
                </div>
            </div>}
        </div>
    );
};
export default InfoWindow;