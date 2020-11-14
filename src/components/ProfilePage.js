import React from 'react';
import { Link } from 'react-router-dom';

function ProfilePage(props) {

    return (
        <div className="profile">
            <img className="profile-pic" src={props.currentUser.img} alt="Profile Image"/>
            <div className="profile-details">
                <h2>{props.currentUser.name}</h2>
                <h2>{props.currentUser.email}</h2>
                <p>{props.currentUser.bio}</p>
                <div className="profile-crud">
                    <Link className='header-links' to={`/profile/${props.currentUser.id}/edit`}>Edit Profile</Link>
                    <button className='header-links'onClick={()=>props.deleteProfile(props.currentUser.id)}>Delete Account</button>
                </div>
            </div>

        </div>
    )
}


export default ProfilePage;