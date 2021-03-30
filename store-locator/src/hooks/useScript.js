import {useEffect, useState} from 'react';

export default function useScript(src) {
    try {
        const [loaded, setLoaded] = useState(false);
        useEffect(() => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = function () {
                setLoaded(true)
            }
            document.body.appendChild(script);
            return () => {
                document.body.removeChild(script);
            }
        }, [src]);
        return loaded;
    } catch (err) {
        console.error(`An error occurred while loading ${src}`);
    }
}