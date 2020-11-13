import React from 'react';
import { Link } from 'react-router-dom';



function AllTrailsShow(props) {
    return(
        <div>
            {props.allTrails.map((trail, idx) => (
                <div className="user-saved-trips" key={idx}>
                    <Link to={`/trails/${trail.id}/unsaved`} >
                        <h3>{trail.name}</h3>
                        <img src={trail.imgMedium} alt="No trail Image Avaliable" />
                        <p>{trail.summary}</p>
                    </Link>
                </div>
            ))}
        </div>
    )
}


export default AllTrailsShow;