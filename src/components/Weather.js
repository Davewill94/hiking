import React from 'react';

function Weather(props) {
    console.log(props.weather)
    return(
        <div className="weather-ribbon">
            <img src={`http://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`} alt="weather-img"/>
            <p>{props.weather.weather[0].description}</p>

        </div>
    )

}


export default Weather;