import React from 'react';

function SavedTrailDetails (props) {
    const currentTrail = props.trails.find(trail => trail.id===parseInt(props.trailId))
    return (
        <div className="trip-detials">
            <h3>{currentTrail.title}</h3>
            <img src={currentTrail.image} alt="Sorry no image" />
            <p>{currentTrail.description}</p>
            <div className="trip-sub-details" >
                <p>{currentTrail.type}</p>
                <p>{currentTrail.difficulty}</p>
                <p>{currentTrail.location}</p>
                <p>{currentTrail.length} mile</p>
            </div>
        </div>
    )
}

export default SavedTrailDetails;