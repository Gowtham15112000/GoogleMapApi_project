import React from 'react';

export default function MyMarker(props) {
    return (
        <div style={{height:'10px', width: '10px', border:'2px solid red'}}>
            {props.text}
        </div>
    )
}