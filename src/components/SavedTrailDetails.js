import React from 'react';
import { Link } from 'react-router-dom';
import Weather from './Weather';

function SavedTrailDetails (props) {

    const currentTrail = props.trails.find(trail => trail.id===parseInt(props.trailId))
    const currentReviews = props.reviews.filter(review => review.trailId===parseInt(props.trailId))
    if(!props.weather) {
       props.getWeather(currentTrail.lat, currentTrail.lng); 
    }
    
    return (
        <div className="trip-detials">
            <h3>{currentTrail.title}</h3>
            <div className="trail-show">
                <img src={currentTrail.image} alt="Sorry no image" />
                <div className="trip-sub-details" >
                    <h4>{currentTrail.description}</h4>
                    <p>Type:       {currentTrail.type}</p>
                    <p>Difficulty: {currentTrail.difficulty}</p>
                    <p>Location:   {currentTrail.location}</p>
                    <p>Length:     {currentTrail.length} miles</p>

                    <label onClick={(e) => props.map(e)}>{props.showMap?"Hide Trail Map":"See Trail Map" }</label> 
                    <Link to={`/reviews/${props.userId}/${currentTrail.id}/create`}>
                        Create A New Review
                    </Link>
                </div>
            </div>
            {props.weather && <Weather weather={props.weather}/> }
            {props.showMap &&
                <div className='trail-map'>
                    <iframe 
                        src={`https://www.hikingproject.com/widget?v=3&map=1&type=trail&id=${currentTrail.trail_id}&x=-12333477&y=5431238&z=6`}>
                    </iframe>
                </div>
            }
            <div className="review-container">
                {currentReviews.map((review, idx) => 
                        <div className="individual-review" key={idx}>
                            <h4>{review.review}</h4>
                            <p>{review.rating}/5</p>
                            {props.userId === review.userId && 
                                <div className="review-crud">
                                    <button onClick={()=> props.deleteReview(review.id)}>Delete</button>
                                    <Link to={`/reviews/${props.userId}/${currentTrail.id}/edit/${review.id}`}>
                                        Edit Review
                                    </Link>
                                </div>
                            }
                        </div>
                )}
            </div>
        </div>
    )
}

export default SavedTrailDetails;