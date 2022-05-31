import "./Sidebar.css";
import React, {useEffect} from "react";
import {Container} from "semantic-ui-react";
import NavigationAccordion from "./NavigationAccordion";

export default function Sidebar({map}) {
    useEffect(() => {
    }, [map]);
    return <div className="sidebar">
        <Container>
            <NavigationAccordion map={map}/>
        </Container>,
    </div>
}
