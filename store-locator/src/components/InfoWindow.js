import "./InfoWindow.css";

export default function InfoWindow({name, address, contact, openingHours}) {
    let openingLabel;
    if (openingHours && openingHours.open_now) {
        openingLabel = openingHours.current_slice["all-day"] ? "24/24" : openingHours.current_slice.start + "–" + openingHours.current_slice.end;
    }
    return (
        <div className="infoWindow">
            <div className="infoWindow__storeName">{name}</div>
            {address && <div>
                <h4 className="infoWindow__addressTitle">Address</h4>
                <div className="infoWindow__addressLines">{address.lines}</div>
                <div className="infoWindow__addressCity">{address.city}</div>
            </div>}
            {contact && <div>
                <h4 className="infoWindow__contactTitle">Contact</h4>
                <div className="infoWindow__contactPhone">{contact.phone}</div>
                <div className="infoWindow__contactWebsite"><a href={contact.website} target='_blank'>go to website</a>
                </div>
            </div>}
            {openingLabel &&
            <div className="infoWindow__openingHours">
                Open now: {openingLabel}
            </div>}
        </div>
    );
}
