import React, { useEffect, useState, useRef } from "react";
import {
  TileLayer,
  MapContainer,
  Marker,
  Polyline,
  Popup
} from "react-leaflet";
import L from 'leaflet';
import '@/assets/css/leaflet.css';
import env from "react-dotenv";

const maps = {
  base: "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
};

const Maps = (props) => {
  const [pins, setPins] = useState([]);
  const [labels, setLabels] = useState([]);
  const [way, setWay] = useState([]);
  const myMap = useRef();

  useEffect(() => {
    if (props?.markers && Array.isArray(props?.markers)) {
        if (!props.markers?.reduce((sum, next) => sum && (next.lat === undefined || next.lon === undefined),true)) {
          props.markers?.map((val, idx) => {
              setPins(prev => prev.concat(L.latLng(val.lat, val.lon)))
              setLabels(prev => prev.concat({ latLng: L.latLng(val.lat, val.lon), label: val.label }))
          })
          fetchData().then(res => {
              setWay(filterData(res.routes[0].geometry.coordinates))
          })
        }
    }
    
    setTimeout(() => {
        myMap.current.invalidateSize()
    },300)

    return () => {
        return false
    }
  },[props.markers])

  const filterData = (data) => {
    return data.map(val => {
        return L.latLng(val[1],val[0])
    })
  }

  const fetchData = async () => {
        const data = await fetch(`${env.MAPBOX_BASE_API}${encodeURI(props.markers[0].lon+','+props.markers[0].lat+';'+props.markers[1].lon+','+props.markers[1].lat)}?geometries=geojson&language=en&overview=simplified&steps=true&access_token=${env.MAPBOX_API_KEY}`,{
            method: 'GET'
        })

        const json = await data.json()
        return json
    }

  return (
    <>
      <MapContainer
        ref={myMap}
        center={[props?.lat ?? -7.8124827, props?.lng ?? 110.363103]}
        zoom={12}
        zoomControl={false}
        style={{ height: props.height ? props.height:"70vh", width: props.width ? props.width:"100%", padding: 0 }}        
      >
        <TileLayer url={maps.base} />
        {
          props.markers ? (
            <>
              {pins.map((val, index) => {
                  return <Marker key={index} position={val} icon={index === 0 ? L.icon({ iconUrl: require('@/assets/images/pick-up.png'), iconSize: [32, 32], iconAnchor: [16, 32] }):L.icon({ iconUrl: require('@/assets/images/drop-off.png'), iconSize: [32, 32], iconAnchor: [16, 32] })} title={index === 0 ? 'Pick Up':'Drop Off'} />
              })}
              {labels.map((val, idx) => {
                  return <Popup key={idx} position={val.latLng} offset={L.point(0,-20)} content={`<small>${idx === 0 ? 'Pick Up':'Drop Off'}</small><br/><strong>${val.label}</strong>`} keepInView={true} autoClose={false} closeButton={false} closeOnClick={false} />
              })}
              <Polyline positions={way} />
            </>
          ):null
        }
      </MapContainer>
    </>
  );
};

export default Maps;