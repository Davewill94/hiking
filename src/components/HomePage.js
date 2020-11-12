import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return(
        <div id="homepage">
            <nav className='hompage-nav'>
                <Link to='/login'>Login</Link>
                <p>Or</p>
                <Link to='/signup'>Sign Up</Link>
                <Link to='/gettrail'>Get One trail</Link>
            </nav>
        </div>
    )
}

export default HomePage;