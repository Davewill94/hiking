import React from 'react';
import { Link } from 'react-router-dom';


function TrailShow(props) {
    return(
        <div className='saved-trail-wrapper'>
            {props.userSavedTrails && props.userSavedTrails.map((trail, idx) => (
                <div className="user-saved-trials header-links" key={idx}>
                        <div className="trail-container">
                        <Link to={`/trails/${trail.id}/saved`} >
                            <h3>{trail.title}</h3>
                            <img className="saved-img"src={trail.image} alt={trail.title} />
                            <p>{trail.description}</p>
                        </Link>
                        <button onClick={()=>
                            props.deleteSavedTrail(props.currentUser.id, trail.id)}
                        >
                            Remove Saved Trail
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}


export default TrailShow;