import './App.css';
import { Route, Link, withRouter } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Login from './components/LogIn';
import SignUp from './components/SignUp';
import TrailShow from './components/TrailShow';
import React, { Component } from 'react';

import { createUser, loginUser, 
          verifyUser, destroyProfile, 
          putProfile, getSavedTrails,
          destroySavedTrail,
          getAllReviews, destroyReview,
          postReview, putReview
        } from './services/api_helper';

import ProfilePage from './components/ProfilePage';
import UpdateProfilePage from './components/UpdateProfilePage';
import TrailsContainer from './components/TrailsContainer';
import ReviewCreateForm from './components/ReviewCreateForm';
import ReviewEditForm from './components/ReviewEditForm';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: null,
      userSavedTrails: null,
      allTrailsReviews: null
    }
  }

  handleLogin = async (e, loginData) => {
    e.preventDefault();
    const currentUser = await loginUser(loginData);
    this.setState({currentUser});
    this.props.history.push(`/profile/${currentUser.id}`);
    this.getUsersTrails();
  }
  
  handleRegister = async (e, registerData) => {
    e.preventDefault();
    const currentUser = await createUser(registerData);
    this.setState({currentUser});
    this.props.history.push(`/profile/${currentUser.id}`);
  }
  
  handleVerify = async () => {
    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({ currentUser });
      this.props.history.push(`/profile/${currentUser.id}`);
    }
  }

  handleLogout = () => {
    localStorage.removeItem('authToken');
    this.props.history.push('/login');
    this.setState({
      currentUser: null,
      userSavedTrails: null
    });

  }

  deleteProfile = async (id) => {
    await destroyProfile(id);
    this.handleLogout();
  }

  updateProfile = async (e, id, profileData) => {
    e.preventDefault();
    const updatedProfile = await putProfile(id, profileData);
    this.setState({ 
      currentUser: updatedProfile
    });
    this.props.history.push(`/profile/${updatedProfile.id}`)
  }

  getUsersTrails = async () => {
    if(this.state.currentUser) {
      const userSavedTrails = await getSavedTrails(this.state.currentUser.id);
      this.setState({ userSavedTrails: userSavedTrails.savedtrails })
    }
  }

  deleteSavedTrail = async (userId, trailId) => {
    await destroySavedTrail(userId,trailId);
    const savedTrails = this.state.userSavedTrails;
    const remainingSaved = savedTrails.filter(trail => trail.id !== parseInt(trailId));
    this.setState({
      userSavedTrails: remainingSaved
    })
    this.props.history.push(`/profile/${userId}`)
  }
  allReviews = async () => {
    const allTrailsReviews = await getAllReviews()
    this.setState({
      allTrailsReviews
    })
  }

  deleteReview = async (reviewId) => {
    await destroyReview(reviewId)
    await this.allReviews();
  }

  createReview = async (e, reviewData) => {
    e.preventDefault();
    reviewData.rating = parseInt(reviewData.rating)
    reviewData.userId = parseInt(reviewData.userId)
    reviewData.trailId = parseInt(reviewData.trailId)

    await postReview(reviewData)
    await this.allReviews()

    this.props.history.push(`/trails/${reviewData.trailId}/saved`)
  }
  editReview = async (e, reviewData) => {
    e.preventDefault();
    reviewData.rating = parseInt(reviewData.rating)
    reviewData.userId = parseInt(reviewData.userId)
    reviewData.trailId = parseInt(reviewData.trailId)

    await putReview(reviewData)
    await this.allReviews()

    this.props.history.push(`/trails/${reviewData.trailId}/saved`)
  }

  componentDidMount() {
    this.handleVerify();
    this.getUsersTrails();
    this.allReviews();
  }


  render() {
    return (
      <div className="App">
        {!this.state.currentUser && 
          <Route exact path='/'>
            <HomePage currentUser={this.state.currentUser}/>
          </Route> 
        }
        {this.state.currentUser ?
        <> 
          <Header currentUser={this.state.currentUser} getSaved={this.getUsersTrails}/> 
          <div>
            <p>Hello {this.state.currentUser.username}</p>
            <button onClick={this.handleLogout}>Logout</button>
          </div> 
        </>
          :
          <></>
          // <Link to='/login'><button>Login/Register</button></Link>
        }

        <Route path="/login" render={() => (
          <Login handleLogin={this.handleLogin}/>
        )} />
        <Route path="/register" render={() => (
          <SignUp handleRegister={this.handleRegister} />
        )} />
        <Route exact path='/profile/:id' render={() => (
          <ProfilePage currentUser={this.state.currentUser} deleteProfile={this.deleteProfile}/>
        )} />
        {this.state.userSavedTrails && 
          <Route exact path='/profile/:id' render={() => (
            <TrailShow 
              userSavedTrails={this.state.userSavedTrails} 
              currentUser={this.state.currentUser}
              deleteSavedTrail={this.deleteSavedTrail}
            />
          )} />
        }
        <Route path="/profile/:id/edit" render={() => (
          <UpdateProfilePage currentUser={this.state.currentUser} updateProfile={this.updateProfile}/>
        )} />
        <Route path="/trails" render={() => (
          <TrailsContainer  userId={this.state.currentUser.id} 
                            userSavedTrails={this.state.userSavedTrails}
                            reviews={this.state.allTrailsReviews}
                            deleteReview={this.deleteReview}
          />
        )} />
        <Route path="/reviews/:userId/:trailId/create" render={(props) => (
          <ReviewCreateForm 
              createReview={this.createReview}
              trailId={props.match.params.trailId}
              userId={props.match.params.userId}
          />
        )} />
        <Route path="/reviews/:userId/:trailId/edit/:reviewId" render={(props) => (
            <ReviewEditForm 
                allTrailsReviews={this.state.allTrailsReviews}
                editReview={this.editReview}
                trailId={props.match.params.trailId}
                userId={props.match.params.userId}
                reviewId={props.match.params.reviewId}
            />
        )} />
      </div>
    );
  }

}

export default withRouter(App);
