import React, { useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios';

import { useState } from 'react';

const mapStyles = {
  width: '100%',
  height: '100%',
};

export function MapContainer (props){
  
  const [towerData, setTowerData] = useState([]);
  const [initialCenter, setInitialCenter] = useState({ lat:0,
    lng:0});
  

  useEffect(() => {
    axios.get('http://localhost:5001/mapData')
    .then(result => setTowerData(result.data, `initialcenter,0,0,0,0,0,${initialCenter.lat},${initialCenter.lng}`))
  }, []);
  
  const addCenterMarker = (lat,lng) => {
    setTowerData([...towerData,`center,0,0,0,0,0,${lat},${lng},0`])
  }
    return (
      <>
      <div>
        <div style={{float:'left'}}>
          <button onClick={()=>{
            setInitialCenter(
              { lat: 28.7041,
                lng: 77.1025
              })
              setTowerData([...towerData,`initialcenter,0,0,0,0,0,28.7041,77.1025,0`])
            }
          }
          >
            Delhi
        </button>

        <button onClick={()=>{
            setInitialCenter(
              { lat: 13.0827,
                lng: 80.27
              })
              setTowerData([...towerData,`initialcenter,0,0,0,0,0,13.0827,80.27,0`])
            }
          }
          >
            Chennai
        </button>
        <button onClick={()=>{
            setInitialCenter(
              { lat: 19.0760,
                lng:72.8777
              })
              setTowerData([...towerData,`initialcenter,0,0,0,0,0,19.0760,72.877,0`])
            }
          }
          >
            Mumbai
        </button>
        <button onClick={()=>setInitialCenter({lat: 74.508074,
          lng: 34.358491})}>tower Details</button>
        </div>
          
      <input type={'number'} placeholder={'Latitude'} value={initialCenter.lat} onChange={(e) => {setInitialCenter({...initialCenter, lat: e.target.value})}}/>
      <input type={'number'} placeholder={'Longitude'} value={initialCenter.lng} onChange={(e) => {setInitialCenter({...initialCenter, lng: e.target.value})}}/>
      <button onClick={() => addCenterMarker(initialCenter.lat, initialCenter.lng)}>Locate me</button>
      </div>
      <Map
        google={props.google}
        zoom={6}
        style={mapStyles}
        center={
          initialCenter
        }

      >
      {
        towerData.map((data,index) => {
          return <Marker
            key={index}
            onClick={() => { alert("Latitude is :" + data.split(',')[6] +" Longitude is:" + data.split(',')[7])}}
            position={{ lat:data.split(',')[6], lng: data.split(',')[7]}}
          />
      })
      }
      </Map>
      </>
    );
  }

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDL5ZpMacru3HV0Q_sBN9ts_IGRoNPOxwE'
})(MapContainer);