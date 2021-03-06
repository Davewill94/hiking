import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import axios from 'axios';
import {bulkPostTrails, getTrail, postSavedTrails} from '../services/api_helper';


import FindTrail from './FindTrail';
import AllTrailsShow from './AllTrailsShow';
import TrailDetails from './TrailDetails';
import SavedTrailDetails from './SavedTrailDetails';


require ('dotenv').config();

class TrailsContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            lat:"",
            lng:"",
            location: '',
            range: 5,
            trails: [],
            weather: null,
            displayMap: true
        }
    }

    getLocation() {
        if(navigator.geolocation){
            var options = {timeout:60000};
            navigator.geolocation.getCurrentPosition
            (this.showLocation, this.errorHandler, options);
         } else{
            alert("Sorry, browser does not support geolocation!");
         }
    }
    errorHandler(err) {
        if(err.code == 1) {
           alert("Error: Access is denied!");
        } else if( err.code == 2) {
           alert("Error: Position is unavailable!");
        }
    }

    showLocation = async (position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        const resp = await axios.get(
            `https://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.REACT_APP_MAP_KEY}&location=${latitude},${longitude}`
        )
        let currentLocation = `${resp.data.results[0].locations[0].adminArea5}, ${resp.data.results[0].locations[0].adminArea3}`

        this.setState({
            lat: latitude,
            lng: longitude,
            location: currentLocation,
            range: 5
        })
    }
   
    newLatLng = async (city) => {
        const resp = await axios.get(
           `https://www.mapquestapi.com/geocoding/v1/address?key=${process.env.REACT_APP_MAP_KEY}&location=${city}`
        )
        return resp
    }

    findAllTrails = async (e, newLocation) => {
        e.preventDefault();
        let response
        if(newLocation.location===this.state.location) {
            response = await axios.get(
                `https://www.hikingproject.com/data/get-trails?lat=${this.state.lat}&lon=${this.state.lng}&maxDistance=${newLocation.range}&key=200969679-32371fdf01a17cc4109f3f3b343a8185`
            )
            this.getWeather(this.state.lat, this.state.lng);
        } else {
            let newResp = await this.newLatLng(newLocation.location);
            let newLat = newResp.data.results[0].locations[0].latLng.lat;
            let newLng = newResp.data.results[0].locations[0].latLng.lng;
            response = await axios.get(
                `https://www.hikingproject.com/data/get-trails?lat=${newLat}&lon=${newLng}&maxDistance=${newLocation.range}&key=200969679-32371fdf01a17cc4109f3f3b343a8185`
            )
            this.getWeather(newLat, newLng);
        }
        let bulkTrails =[];
        response.data.trails.forEach(element => {
            let trail = {
                title: element.name,
                trail_id: element.id,
                type: element.type,
                image: element.imgMedium,
                difficulty: element.difficulty,
                description: element.summary,
                rating: element.stars,
                length: element.length,
                location: element.location,
                lat: element.latitude,
                lng: element.longitude
            }
            bulkTrails.push(trail)
        });
        bulkPostTrails(bulkTrails);
        this.setState({
            trails: response.data.trails
        })


    }

    saveTrail = async (trailId) => {

        const foundTrail = await getTrail(trailId);
        const savedTrailData = {
            userId: this.props.userId,
            trailId: foundTrail.id
        }

        await postSavedTrails(savedTrailData);
    }
    getWeather = async (lat, lng) => {
        const weather = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=890f7e4f2e7832ce6f45fef03dabb499&units=imperial`
        )

        this.setState({
            weather: weather.data
        })
    }
    showHideMap = (e) => {
        this.setState({
            displayMap: !this.state.displayMap
        })
    }


    componentDidMount() {
        this.getLocation();
    }

    render() {
        return(
            <div>
                <Route exact path="/trails" render={() => ( 
                    <>
                    <h3>Find Some Trails</h3>
                    {this.state.location !='' && 
                        <FindTrail details={this.state.location} findAllTrails={this.findAllTrails} />
                    }
                    {this.state.trails.length !=0 && 
                        <AllTrailsShow allTrails={this.state.trails}/>
                    }
                    </>
                )} />
                
                <Route path="/trails/:id/saved" render={(props) => (
                    <SavedTrailDetails  trails={this.props.userSavedTrails} 
                                        trailId={props.match.params.id}
                                        flag={props.match.params.flag}
                                        saveTrail={this.saveTrail}
                                        reviews={this.props.reviews}
                                        userId={this.props.userId}
                                        deleteReview={this.props.deleteReview}
                                        weather={this.state.weather}
                                        getWeather={this.getWeather}
                                        weather={this.state.weather}
                                        showMap={this.state.displayMap}
                                        map={this.showHideMap}
                    />
                )} />
                <Route path="/trails/:id/unsaved" render={(props) => (
                    <TrailDetails   trails={this.state.trails} 
                                    trailId={props.match.params.id}
                                    flag={props.match.params.flag}
                                    saveTrail={this.saveTrail}
                                    weather={this.state.weather}
                                    showMap={this.state.displayMap}
                                    map={this.showHideMap}
                    />
                )} />
            </div>
        )
    }

}

export default TrailsContainer;