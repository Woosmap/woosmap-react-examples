import StorePreview from '../components/StorePreview'
import "./StoresList.css";
import {useEffect, useState} from "react";
import conf from '../config.json'

export default function StoresList({location, mapView, dataSource, selectedStoreHooks}) {
    const [stores, setStores] = useState([])

    useEffect(() => {
        search(location);
    }, [location])

    const setSelectedStore = (store) => {
        mapView.panTo({
            lat: store.geometry.coordinates[1],
            lng: store.geometry.coordinates[0]
        });
        mapView.set("selectedStore", store);
    }

    const search = (location) => {
        if (location) {
            const searchParams = new window.woosmap.search.SearchParameters({
                lat: location.lat,
                lng: location.lng,
                page: 1,
                storesByPage: conf.storesByPage
            });
            dataSource.searchStoresByParameters(searchParams, (nearbyStores) => {
                setStores(nearbyStores.features);
                setSelectedStore(nearbyStores.features[0])
            });
        } else {
            setStores([]);
        }
    }

    return (
        <section>
            {stores.map((store) => (
                <div className="store-preview" key={store.properties.store_id} onClick={() => setSelectedStore(store)}>
                    <StorePreview
                        name={store.properties.name}
                    />
                </div>
            ))}
        </section>
    )
}