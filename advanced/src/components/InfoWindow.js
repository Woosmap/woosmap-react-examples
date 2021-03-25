import "./InfoWindow.css";

export default function InfoWindow({
                                       name,
                                       addressCity,
                                       contactPhone
                                   }) {
    return (
        <div className="store-infowindow">
            <div>{name}</div>
            <div>{addressCity}</div>
            <div>{contactPhone}</div>
        </div>
    );
}
