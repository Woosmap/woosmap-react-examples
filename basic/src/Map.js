import React, {useRef, useEffect, useState} from 'react';
import useScript from "./hooks/useScript";

import './Map.css';
import conf from "./config.json";


const Map = () => {
    const mapContainerRef = useRef(null);
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
                const mapView = new window.woosmap.TiledView(map, conf.markersOptions);
            });
        };
        window.WoosmapLoader.load(conf.woosmapLoadOptions);
    }

    return (
        <div>
            <div className='mapContainer' ref={mapContainerRef}/>
        </div>
    );
};


export default Map;
