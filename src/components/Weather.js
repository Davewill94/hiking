import React from 'react';

function Weather(props) {
    console.log(props.weather)
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

// <div id="openweathermap-widget-11"></div>
// <script src='//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/d3.min.js'></script><script>window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];  window.myWidgetParam.push({id: 11,cityid: '2643743',appid: '890f7e4f2e7832ce6f45fef03dabb499',units: 'metric',containerid: 'openweathermap-widget-11',  });  (function() {var script = document.createElement('script');script.async = true;script.charset = "utf-8";script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);  })();</script>