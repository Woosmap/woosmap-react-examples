import React, {useRef, useEffect, useState} from 'react';
import Infobox from "./components/InfoBox";
import useScript from "./hooks/useScript";

import './Map.css';
import conf from "./config.json";


const Map = () => {
    const mapContainerRef = useRef(null);
    const woosmapLoaded = useScript(conf.woosmapLoaderUrl);
    const [selectedStore, setSelectedStore] = useState(null)

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
                const selectedStoreObserver = new woosmap.utils.MVCObject();
                selectedStoreObserver.selectedStore_changed = () => {
                    setSelectedStore(selectedStoreObserver.get('selectedStore'));
                };
                selectedStoreObserver.bindTo('selectedStore', mapView);
            });
        };
        window.WoosmapLoader.load(conf.woosmapLoadOptions);
    }

    return (
        <div>
            <Infobox store={selectedStore}/>
            <div className='mapContainer' ref={mapContainerRef}/>
        </div>
    );
};

export default Map;