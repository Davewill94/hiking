import React from 'react';
import {Link} from 'react-router-dom';

const Header = (props) => {
    return(
        <div id="header">
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/trails'>Find Trails</Link>
                <Link to={`/profile/${props.currentUser.id}`} 
                    onClick={()=> props.getSaved()}>
                    To Profile
                </Link>
            </nav>
        </div>
    )
}

export default Header;