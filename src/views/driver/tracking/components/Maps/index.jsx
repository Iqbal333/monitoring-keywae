import React, { useEffect, useRef, useState } from "react";
import {
    TileLayer,
    MapContainer
} from "react-leaflet";
import '@/assets/css/leaflet.css';
import DriverPin from "../DriverPin";
import { getDashboardMaps } from "@/api/drivers";
import { EventSourcePolyfill } from "event-source-polyfill";
import env from "react-dotenv";
import { getToken } from "@/utils/token";

const maps = {
    base: "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
};


export default function Maps(props) {
    const myMap                 = useRef();
    const [markers, setMarkers] = useState([])
    const [sse, setSse]         = useState(null)

    useEffect(() => {
        getDashboardMaps('aab59a09-a9d0-1a57-0736-e7057899bc05').then(results => {
            if (results.data.success) {
                setMarkers(results.data.results)
            }
        })

        return () => {
            return false
        }
    },[])

    const setStatus = (data) => {
        const status = {}

        if (data.isAvailable) {
            status.color  = "green"
            status.icon   = require('@/assets/images/active.webp')
            status.status = "Active"
        } else {
            status.color  = "grey"
            status.icon   = require('@/assets/images/inactive.webp')
            status.status = "Inactive"
        }

        return status
    }

    return (
        <MapContainer
            ref={myMap}
            whenReady={() => {
                setSse(new EventSourcePolyfill(env.MAPS_SSE, {
                    headers: { 
                        'Authorization':'Bearer '+getToken()
                    } 
                }))
            }}
            center={[props.lat, props.lng]}
            zoom={12}
            style={{ height: "70vh", width: "100%", padding: 0 }}
            inertia={true}
        >
            <TileLayer url={maps.base} />
            {markers.map((val, index) => (
                <DriverPin key={index} start={[val.locations.lat, val.locations.lon]} sse={sse} driverId={val.driverId} driverData={val} status={setStatus(val)} />
            ))}
        </MapContainer>
    )
}

