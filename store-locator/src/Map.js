import React, {useRef, useEffect, useState} from 'react';
import ReactDOMServer from "react-dom/server";
import conf from "./config.json";
import useScript from "./hooks/useScript";
import Sidebar from './components/Sidebar';
import InfoWindow from "./components/InfoWindow.js";

import './Map.css';

const Map = () => {
    const mapContainerRef = useRef(null);
    const [mapView, setMapView] = useState(null)
    const [dataSource, setDataSource] = useState(null);
    const woosmapLoaded = useScript(conf.woosmapLoaderUrl);

    useEffect(() => {
        if (woosmapLoaded) {
            initMap();
        }
    }, [woosmapLoaded]);

    const initMap = () => {
        conf.woosmapLoadOptions.callback = () => {
            const loader = new window.woosmap.MapsLoader(conf.googleLoadOptions);
            loader.load(() => {
                const map = new window.google.maps.Map(mapContainerRef.current, conf.googleMapsOptions);
                const dataSource = new window.woosmap.DataSource();
                const mapView = new window.woosmap.TiledView(map, conf.woosmapStyleOptions);
                const templateRenderer = {
                    render: (storeProperties) => {
                        return ReactDOMServer.renderToString(
                            <InfoWindow
                                name={storeProperties.name}
                                address={storeProperties.address}
                                contact={storeProperties.contact}
                                openingHours={storeProperties.open}
                            />
                        );
                    }
                };
                const infoWindow = new window.woosmap.LocatorWindow(map, templateRenderer, conf.infoWindow);
                mapView.bindTo("selectedStore", infoWindow);

                setMapView(mapView);
                setDataSource(dataSource);
            });
        };
        window.WoosmapLoader.load(conf.woosmapLoadOptions);
    }

    return (
        <div>
            <div className='mapContainer' ref={mapContainerRef}/>
            <Sidebar mapView={mapView} dataSource={dataSource}/>
        </div>
    );
};


export default Map;
