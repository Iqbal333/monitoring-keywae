import React, { useEffect, useRef, useState } from 'react';
import ReactLeafletDriftMarker from 'react-leaflet-drift-marker';
import { Popup } from 'react-leaflet';
import * as L from 'leaflet';

const LAT_ = -6.203789
const LAT__ = -6.358961
const LNG_ = 106.626957
const LNG__ = 106.815572


export default function DriverPin(props) {
    const marker                  = useRef()
    const popup                   = useRef()
    const [start, setStart]       = useState([getRandomInt(LAT_,LAT__),getRandomInt(LNG_,LNG__)])
    const [color, setColor]       = useState("green")
    const [status, setStatus]     = useState("Active")
    const [icon, setIcon]         = useState(require('@/assets/images/active.png'))
    
    useEffect(() => {
        console.log(props)
        setStart(props.start)
        setStatus(props.status.status)
        setIcon(props.status.icon)
        setColor(props.status.color)

        props.sse.addEventListener('driver-trip-'+props.driverId, (event) => {
            let dataEvent = JSON.parse(event.data)
            setStart([dataEvent.locations.lat, dataEvent.locations.lon])
            let cur = setIconReq(dataEvent).icon
            setIcon(cur)
            Load({ status: cur.status, color: cur.color })
        })

        props.sse.addEventListener('error', e => {
            console.error("ErrorEvent", e)
        })

        Load({ status: props.status.status, color: props.status.color })
    },[])

    const Load = (data = { status: 'Active', color: 'green' }) => {
        popup.current.close()
        marker.current.on('move', () => {
            popup.current.close()
        })
        marker.current.on('click', () => {
            popup.current.setContent(
                `<div style="width: max-content; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <img src="${props.driverData.driverImageUrl}" width="50px" />
                    <span style="font-size: medium; font-weight: 600;">${props.driverData.driverName}</span>
                    <span style="font-size: small; font-weight: 500;">${props.driverData.vehicleBrand} - ${props.driverData.vehiclePlateNumber}</span>
                    <div style="display: flex;flex-direction: row;justify-content: space-between; align-items: center;margin-top: 3px;">
                        <span style="font-size: medium; font-weight: 600;">Status</span>
                        <div style="margin-left: 5px;margin-right: 5px" />
                        <span style="font-size: medium; font-weight: 600;color: ${data.color}">${data.status}</span>
                    </div>
                </div>`
            )
            popup.current.toggle(marker.current)
        })
    }

    const setIconReq = (data) => {
        if (data.isAvailable) {
            if (data.isPickUp && !data.isDropOff && !data.isAccept) {
                return {icon:require('@/assets/images/pickup.webp'),status:'Pick Up',color:'yellow'}
            }
            if (data.isDropOff && !data.isPickUp && !data.isAccept) {
                return {icon:require('@/assets/images/dropoff.webp'),status:'Drop Off',color:'red'}
            }
            if (data.isAccept && !data.isDropOff && !data.isPickUp) {
                return {icon:require('@/assets/images/accept.webp'),status:'Accept',color:'blue'}
            }
            return {icon:require('@/assets/images/active.webp'),status:'Active',color:'green'}
        } else {
            return {icon:require('@/assets/images/inactive.webp'),status:'Inactive',color:'grey'}
        }
    }

    return (
        <>
            <ReactLeafletDriftMarker ref={marker} autoPanOnFocus={false} position={start} duration={2000} icon={L.icon({ iconUrl: icon, iconSize: [64, 64] })}  />
            <Popup ref={popup} position={start} offset={L.point(0,-16)} />
        </>
    )
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}