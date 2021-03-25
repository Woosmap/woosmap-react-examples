import React, {useRef, useEffect, useState} from 'react';
import ReactDOMServer from "react-dom/server";
import conf from "./config.json";

import Sidebar from './components/Sidebar';
import InfoWindow from "./components/InfoWindow.js";

import './Map.css';

const Map = () => {
    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(null)
    const [mapView, setMapView] = useState(null)
    const [dataSource, setDataSource] = useState(null);

    // Load Woosmap Loader when component mounts
    useEffect(() => {
        const script = document.createElement("script");
        script.src = conf.woosmapLoaderUrl;
        script.async = true;
        document.body.appendChild(script);
        script.addEventListener("load", () => {
            // init the map when woosmap loader is loaded
            initMap();
        });
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const initMap = () => {
        conf.woosmapLoadOptions.callback = () => {
            const loader = new window.woosmap.MapsLoader(conf.googleLoadOptions);
            loader.load(() => {
                const map = new window.google.maps.Map(mapContainerRef.current, conf.googleMapsOptions);
                const dataSource = new window.woosmap.DataSource();
                const mapView = new window.woosmap.TiledView(map, conf.styleOptions);
                const templateRenderer = {
                    render: (storeProperties) => {
                        return ReactDOMServer.renderToString(
                            <InfoWindow
                                name={storeProperties.name}
                                addressCity={storeProperties.address.city}
                                contactPhone={storeProperties.contact.phone}
                            />
                        );
                    }
                };
                const infoWindow = new woosmap.LocatorWindow(map, templateRenderer, {
                    alignBottom: true,
                    closeBoxURL: "https://images.woosmap.com/close.png",
                    closeBoxMargin: "5px",
                    pixelOffset: {
                        width: -100,
                        height: -80
                    }
                });
                mapView.bindTo("selectedStore", infoWindow);

                setMap(map);
                setMapView(mapView);
                setDataSource(dataSource);
            });
        };
        window.WoosmapLoader.load(conf.woosmapLoadOptions);
    }

    return (
        <div>
            <div className='map-container' ref={mapContainerRef}/>
            <Sidebar mapView={mapView} dataSource={dataSource}/>
        </div>
    );
};


export default Map;
