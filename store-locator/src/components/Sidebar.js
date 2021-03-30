import "./Sidebar.css";
import Autocomplete from "./Autocomplete";
import StoresList from "./StoresList";
import React from "react";
import {useState} from "react";

export default function Sidebar({mapView, dataSource}) {
    const [location, setLocation] = useState(null)

    return <div className="sidebar">
        <Autocomplete locationHooks={location}
                      setLocationHooks={setLocation}/>
        <StoresList location={location} mapView={mapView} dataSource={dataSource}/>
    </div>
}