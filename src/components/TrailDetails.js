import React from 'react';
import Weather from './Weather';


function TrailDetails(props) {
    const currentTrail = props.trails.find(trail => trail.id===parseInt(props.trailId))
    console.log(currentTrail)
    return (
        <div className="trip-detials">
            <h3>{currentTrail.name}</h3>
            <div className='trail-show'>
                <img src={currentTrail.imgMedium} alt="Sorry no image" /> 
                <div className="trip-sub-details" >
                    <h4>{currentTrail.summary}</h4>
                    <p>Type:       {currentTrail.type}</p>
                    <p>Difficulty: {currentTrail.difficulty}</p>
                    <p>Location:   {currentTrail.location}</p>
                    <p>Length:     {currentTrail.length}miles</p>
                    <button onClick={()=>props.saveTrail(currentTrail.id)}>Save Trip</button> 
                    <label onClick={(e) => props.map(e)}>{props.showMap?"Hide Trail Map":"See Trail Map" }</label>
                </div>  
            </div>
            <Weather weather={props.weather}/>
            {props.showMap &&
                <div className='trail-map'>
                    <iframe 
                        src={`https://www.hikingproject.com/widget?v=3&map=1&type=trail&id=${props.trailId}&x=-12333477&y=5431238&z=6`}>
                    </iframe>
                </div>
            }
        </div>

    )

}





export default TrailDetails;