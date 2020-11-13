import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = (props) => {
    return(
        <div id="homepage">
            <nav className='hompage-nav'>
                <Link to='/login'>Login</Link>
                <p>Or</p>
                <Link to='/register'>Sign Up</Link>
            </nav>
        </div>
    )
}

export default HomePage;