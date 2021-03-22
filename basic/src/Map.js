import React, {useRef, useEffect, useState} from 'react';
import './Map.css';
import conf from "./config.json";


const Map = () => {
    const mapContainerRef = useRef(null);

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
                const mapView = new window.woosmap.TiledView(map, conf.markersOptions);
            });
        };
        window.WoosmapLoader.load(conf.woosmapLoadOptions);
    }

    return (
        <div>
            <div className='map-container' ref={mapContainerRef}/>
        </div>
    );
};


export default Map;
