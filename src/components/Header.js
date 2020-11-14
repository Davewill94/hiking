import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

const Header = (props) => {
    return(

        <div id="header">
            <div className="title">
                <h1>Take a Hike</h1>
            </div>
            {props.currentUser &&
                <nav className='header-nav'>
                    <Link to='/' className='header-links'>Home</Link>
                    <Link to='/trails' className='header-links'>Find Trails</Link>
                    <Link className='header-links'
                        to={`/profile/${props.currentUser.id}`} 
                        onClick={()=> props.getSaved()}>
                        To Profile
                    </Link>
                    <button className='header-links'
                            onClick={()=>props.handleLogout()}>
                        Logout
                    </button>
                </nav>
            }
        </div>
    )
}

export default Header;