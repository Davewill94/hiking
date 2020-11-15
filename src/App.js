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
          postReview, putReview,
          getAllTrails
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
      allTrailsReviews: null,
      allTrails: null,
      hasMounted: false
    }
  }

  handleLogin = async (e, loginData) => {
    e.preventDefault();
    const currentUser = await loginUser(loginData);
    this.setState({currentUser});
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    this.props.history.push(`/profile/${currentUser.id}`);
    this.getUsersTrails();
    this.getEveryTrail();
  }
  
  handleRegister = async (e, registerData) => {
    e.preventDefault();
    const currentUser = await createUser(registerData);
    this.setState({currentUser});
    this.props.history.push(`/profile/${currentUser.id}`);
    this.getEveryTrail();
  }
  
  handleVerify = async () => {
    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({ currentUser });
      this.props.history.push(`/profile/${currentUser.id}`);
    }
    this.getEveryTrail();
  }

  handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userSavedTrails');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('allTrailsReviews');
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
      localStorage.setItem("userSavedTrails", JSON.stringify(userSavedTrails.savedtrails))
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
    const allTrailsReviews = await getAllReviews();
    localStorage.setItem("allTrailsReviews", JSON.stringify(allTrailsReviews))
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

  saveStateToLocalStorage = () => {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]))
    }
  }

  populateStateFromLocalStorage = () => {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  getEveryTrail = async ()=> {
    const allTrails = await getAllTrails()
    this.setState({
      allTrails
    })
  }

  componentDidMount() {
    this.handleVerify();
    this.getUsersTrails();
    this.allReviews();
    this.populateStateFromLocalStorage();
    this.setState({
      hasMounted: true
    })
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
    );
  }

  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser} 
                getSaved={this.getUsersTrails}
                handleLogout={this.handleLogout}
        /> 

          <Route exact path='/'>
            <HomePage currentUser={this.state.currentUser}
                      allTrails={this.state.allTrails}
            />
          </Route> 
    
        <Route path="/login" render={() => (
          <Login handleLogin={this.handleLogin}/>
        )} />
        <Route path="/register" render={() => (
          <SignUp handleRegister={this.handleRegister} />
        )} />
        {this.state.hasMounted && <>
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
        </>}
      </div>
    );
  }

}

export default withRouter(App);
