import "./NavigationAccordion.css";
import React, {useEffect, useState} from "react";
import {Accordion, Button} from "semantic-ui-react";

let menuJSON = [
    {
        key: "Africa",
        title: "Africa",
        content: [
            {
                key: "Kenya",
                title: "Kenya",
                latlng: [0.28627733016287993, 37.776046039564385]
            }
        ]
    },
    {
        key: "China",
        title: "China",
        content: [
            {
                key: "Shanghai",
                title: "Shanghai",
                latlng: [31.0606, 121.2492],
            },
            {
                key: "Shenzhen",
                title: "Shenzhen",
                latlng: [22.5472, 113.939],
            }
        ]
    },
    {
        key: "India",
        title: "India",
        content: [
            {
                key: "AndhraPradesh",
                title: "Andhra Pradesh",
                latlng: [15.135480877241276, 78.93828680710205]
            },
            {
                key: "Goa",
                title: "Goa",
                latlng: [15.345622915076794, 73.93400581886623]
            },
            {
                key: "Gujarat",
                title: "Gujarat",
                latlng: [22.142464924133535, 70.85081413023991]
            }
        ]
    }
];


export default function NavigationAccordion({map}) {
    const [menu, setMenu] = useState([])

    useEffect(() => {
        if (map) {
            setMenu(buildMenu(menuJSON))
        }
    }, [map])

    const setMapCenter = (location) => {
        const lat = location[0];
        const lng = location[1];
        map.setCenter({lat, lng})
        map.setZoom(7)
    }

    const buildMenu = (menu) => {
        for (let i = 0; i < menu.length; i++) {
            if (menu[i]["content"] && menu[i]["content"].length !== 0) {
                let nestedContent = [];
                let nestedMenu = menu[i]["content"]
                for (let j = 0; j < nestedMenu.length; j++) {
                    nestedContent.push(
                        <Button basic fluid
                                onClick={(event) => {
                                    setMapCenter(nestedMenu[j].latlng);
                                }}
                                key={nestedMenu[j].key}
                                content={nestedMenu[j].title} icon='right arrow'
                                labelPosition='left'/>
                    )
                }
                menu[i]["content"] = {
                    content: (nestedContent)
                };
            }
        }
        return menu
    }

    return (
        <Accordion
            panels={menu} styled/>
    )
}
