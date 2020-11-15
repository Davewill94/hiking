import React from 'react';
import Weather from './Weather';


function TrailDetails(props) {
    const currentTrail = props.trails.find(trail => trail.id===parseInt(props.trailId))

    return (
        <div className="trip-detials">
            <h3>{currentTrail.name}</h3>
            <img src={currentTrail.imgMedium} alt="Sorry no image" />
            <Weather weather={props.weather}/>
            <p>{currentTrail.summary}</p>
            <div className="trip-sub-details" >
                <p>{currentTrail.type}</p>
                <p>{currentTrail.difficulty}</p>
                <p>{currentTrail.location}</p>
                <p>{currentTrail.length}</p>
            </div>
            <button onClick={()=>props.saveTrail(currentTrail.id)}>Save Trip</button>
        </div>

    )

}





export default TrailDetails;