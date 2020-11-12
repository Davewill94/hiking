import React from 'react';
import { Link } from 'react-router-dom';


import TrailDetails from './TrailDetails';

function TrailShow(props) {
    return(
        <div>
            {props.userSavedTrails && props.userSavedTrails.map((trail, idx) => (
                <div className="user-saved-trips" key={idx}>
                    <Link to={`/trails/${trail.id}/saved`} >
                        <h3>{trail.title}</h3>
                        <img src={trail.image} alt={trail.title} />
                        <p>{trail.description}</p>
                    </Link>
                    <button onClick={()=>
                        props.deleteSavedTrail(props.currentUser.id, trail.id)}
                    >
                        Remove Saved Trail
                    </button>
                </div>
            ))}
        </div>
    )
}


export default TrailShow;