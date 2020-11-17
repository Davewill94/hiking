import React from 'react';
import { Link } from 'react-router-dom';


const HomePage = (props) => {

    return(
        <div id="homepage">
            {!props.currentUser ?
            <>
            <nav className='hompage-nav'>
                <Link to='/login'>Login</Link>
                <p>Or</p>
                <Link to='/register'>Sign Up</Link>
            </nav>
            </>
            :
            <>
            <div className='saved-trail-wrapper all-show'>
                {props.allTrails.map((trail, idx) => (
                    <div className="user-saved-trials header-links" key={idx}>
                            <div className="trail-container">
                            {/* <Link to={`/trails/${trail.id}/saved`} > */}
                                <h3>{trail.title}</h3>
                                <img className="saved-img"src={trail.image} alt={trail.title} />
                                <p>{trail.description}</p>
                            {/* </Link> */}
                        </div>
                    </div>
                ))}
            </div>
            </>}
        </div>
    )
}

export default HomePage;