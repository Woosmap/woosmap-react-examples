import React, {useEffect, useState} from "react";
import "./Autocomplete.css";
import conf from "../config.json";
import useScript from "../hooks/useScript";

const Autocomplete = ({setLocationHooks}) => {
    const [keyword, setKeyword] = useState("")
    const [results, setResults] = useState([])
    const [autocompleteService, setAutocompleteService] = useState(null);
    const woosmapLoaded = useScript(conf.woosmapLocalitiesUrl);

    useEffect(() => {
        if (woosmapLoaded) {
            const autocompleteService = new window.woosmap.localities.AutocompleteService(conf.woosmapLoadOptions.publicKey);
            setAutocompleteService(autocompleteService);
        }
    }, [woosmapLoaded]);

    const updateText = text => {
        setKeyword(text);
        setLocationHooks(null);
        if (!text) {
            setResults([]);
        }
    };
    const updateKeyword = text => {
        updateText(text);
        onSearch(text);
    };

    const searchNearbyStores = (text, location) => {
        updateText(text);
        setResults([]);
        setLocationHooks(location);
    };

    const onSearch = async text => {
        if (text !== "") {
            autocompleteService.getQueryPredictions({
                    input: text
                }, response => {
                    setResults(response.localities);
                },
                (errorCode, errorText) => {
                    console.error(`error ${errorCode} : ${errorText}`)
                }
            );
        } else setResults([]);
    };

    const renderResults = results.map(({description, location}, index) => {
        return (
            <PredictionPreview
                key={index}
                searchNearbyStores={searchNearbyStores}
                index={index}
                description={description}
                location={location}
            />
        );
    });
    return (
        <div className="autocomplete">
            <button
                onClick={() => updateText("")}
                className={`autocomplete__cancelBtn ${keyword.length > 0 ? "active" : "inactive"}`}>
                <img src="https://images.woosmap.com/close.svg" alt="reset"/>
            </button>
            <input
                className="autocomplete__input"
                placeholder="Search Localities..."
                value={keyword}
                onChange={e => updateKeyword(e.target.value)}
            />

            {results.length > 0 ? (
                <div className="predictionsResults">{renderResults}</div>
            ) : null}
        </div>
    );
}

const PredictionPreview = ({description, index, searchNearbyStores, location}) => {
    return (
        <div onClick={() => searchNearbyStores(description, location)}
             className="predictionPreview">
            <div className="predictionPreview__locality">
                <p className="predictionPreview__localityDesc">{description}</p>
            </div>
        </div>
    );
};

export default Autocomplete;