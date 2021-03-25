import React, {useEffect, useState} from "react";
import "./Autocomplete.css";
import conf from "../config.json";

const Autocomplete = ({
                          setLocationHooks
                      }) => {
    const [keyword, setKeyword] = useState("")
    const [results, setResults] = useState([])
    const [autocompleteService, setAutocompleteService] = useState(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = conf.woosmapLocalitiesUrl;
        script.async = true;
        document.body.appendChild(script);
        script.addEventListener("load", () => {
            const autocompleteService = new window.woosmap.localities.AutocompleteService(conf.woosmapLoadOptions.publicKey);
            setAutocompleteService(autocompleteService);
        });
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const updateText = text => {
        setKeyword(text);
        setLocationHooks(null);
        if (!text) {
            setResults([]);
        }
    };
    const updateKeyword = text => {
        onSearch(text);
        updateText(text);
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
            <PredictionsPreview
                key={index}
                searchNearbyStores={searchNearbyStores}
                index={index}
                description={description}
                location={location}
            />
        );
    });
    return (
        <div className="autocomplete-container">
            <button
                onClick={() => updateText("")}
                className={`cancel-btn ${keyword.length > 0 ? "active" : "inactive"}`}
            >
                ⨉
            </button>
            <input
                className="autocomplete-input"
                placeholder="Search Localities..."
                value={keyword}
                onChange={e => updateKeyword(e.target.value)}
            />

            {results.length > 0 ? (
                <div className="prediction-results">{renderResults}</div>
            ) : null}
        </div>
    );
}

const PredictionsPreview = ({description, index, searchNearbyStores, location}) => {
    return (
        <div
            onClick={() => searchNearbyStores(description, location)}
            className={`prediction-preview ${index == 0 ? "start" : ""}`}
        >
            <div className="first">
                <p className="locality">{description}</p>
            </div>
        </div>
    );
};

export default Autocomplete;