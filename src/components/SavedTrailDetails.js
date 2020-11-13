import React from 'react';
import { Link } from 'react-router-dom';

function SavedTrailDetails (props) {
    const currentTrail = props.trails.find(trail => trail.id===parseInt(props.trailId))
    const currentReviews = props.reviews.filter(review => review.trailId===parseInt(props.trailId))
    console.log(currentReviews)
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
            {currentReviews.map((review, idx) => 
                    <div className="review-container" key={idx}>
                        <h4>{review.review}</h4>
                        <p>{review.rating}/5</p>
                        {this.props.userId === review.userId && 
                            <button onClick={()=> props.deleteReview(review.id)}>Delete</button>
                        }
                    </div>

            )}
        </div>
    )
}

export default SavedTrailDetails;