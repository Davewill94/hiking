import React from 'react';

function Weather(props) {
   
    return(
        <div className="weather-ribbon">
            <div className="over-view">
                <img src={`http://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`} alt="weather-img"/>
                <p>{props.weather.weather[0].description}</p> 
            </div>
            <div className="temps">
                <h4>Temps:</h4>
                <p>Today's low of {props.weather.main.temp_min.toFixed(1)}F</p>
                <p>Today's high of {props.weather.main.temp_max.toFixed(1)}F</p>
                <p>Current Temp is {props.weather.main.temp.toFixed(1)}F</p> 
            </div>
            <div className='wind'>
                <h4>Winds</h4>
                <p>Speed of {props.weather.wind.speed.toFixed(1)}mph</p>
                {props.weather.wind.gust &&
                 <p>Gusts of {props.weather.wind.gust.toFixed(1)}mph</p>
                }
            </div>
            <div className="gen">
                <p>Feels Like {props.weather.main.feels_like.toFixed(1)}F</p>
            </div>
        </div>
    )

}


export default Weather;
