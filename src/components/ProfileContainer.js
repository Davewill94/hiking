import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import ProfilePage from './ProfilePage';
import UpdateProfilePage from './UpdateProfilePage';

// import {profileIndex} from '../services/api_helper';

class ProfileContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            profile: null
        }
    }
    componentDidMount() {
        console.log(this.props.currentUser);
        this.setState({
            profile: this.props.currentUser
        })

        console.log(this.state.profile);
    }


    render() {
        return(
            <div>
                <Route exact path='/profile/:id' render={(props) => (
                    <ProfilePage profile = {this.state.profile} deleteProfile={this.deleteProfile} />
                )} />
                <Route path = '/profile/:id/edit' render={(props) => (
                    <UpdateProfilePage profile={this.state.profile} updateProfile={this.updateProfile} />
                )} />
            </div>
        )

    }
}


export default withRouter(ProfileContainer);