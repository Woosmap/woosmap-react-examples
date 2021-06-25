import React, {useRef, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import InfoWindow from "./components/InfoWindow";
import useScript from "./hooks/useScript";

import './Map.css';
import conf from "./config.json";


const Map = () => {
    const mapContainerRef = useRef(null);
    const woosmapLoaded = useScript(conf.woosmapLoaderUrl);
    const [selectedStore, setSelectedStore] = useState(null);

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
                const templateInfoWindow = "<div id='infoWindow-{{store_id}}'></div>";
                const templateRenderer = new window.woosmap.TemplateRenderer(templateInfoWindow);
                const infoWindow = new window.woosmap.LocatorWindow(map, templateRenderer);
                infoWindow.setOpeningCallback(() => {
                    const selectedStore = infoWindow.get('selectedStore').properties;
                    return ReactDOM.render(
                        <InfoWindow
                            store={selectedStore}
                        />, document.getElementById(`infoWindow-${selectedStore.store_id}`)
                    );
                });
                mapView.bindTo("selectedStore", infoWindow);
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