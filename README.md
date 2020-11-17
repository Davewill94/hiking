# project-4 - Take-a-hike
## Take a hike
Sei Capstone project

## Description
Take-a-hike allows users to find hiking trails near them or a specified location. Users can save trails to their profile for later viewing. 

## Project Links
  * React app deployed [Take-a-Hike](https://take-a-hike.surge.sh/).
  * Front end repo [here](https://github.com/Davewill94/hiking).
  * Back end deployed [here](https://peaceful-wildwood-15287.herokuapp.com).
  * Back end repo [here](https://github.com/Davewill94/take-a-hike).

### External Apis Used
  * Trail data obtained from - [The Hiking Project](https://www.hikingproject.com/)
  * Weather data obtained from - [Open Weather Map](https://openweathermap.org/api)
  * Geolocation data obtained from - [Map Quest](www.mapquestapi.com)


## Wire Frames
![image](https://i.imgur.com/2WYspTg.png)


## ERD
![image](https://i.imgur.com/ez8MX9d.png)


## MVP
-	Users can sign up/log in. 
-	Users have CRUD functionality on their userprofile.
-	Trail details page shows all the needed information to decide to go on a hike.
-	Logged in users can review/rate and like trails.
-	Profile page displays user’s liked trails.

## Post MVP
- Integrate map that shows the location of the trail.
- Integrate a curent weather ticker for location of trail.
- Integrate map that shows the trail path(maybe).
- Add image uploader for user profile picture.
- Try to get and use users location to search for trails.
- Add filters to allow for result filtering based on trail difficulty.

## User Stories
- As an outdoor enthusiast I would like to know what kind of hiking trails are around me.
- I would like to see some pictures of the hike before hand.
- I would like to know basic trail data like how long the trail is and how hard the trail is.
- I would like to know where the trail is.
- I would like to be able to save liked trails so that I can view them later without having to re-search for them.

## Technologies Used
 - Heroku for database deployment
 - Surge for front end deployment
 - Sequelize for database creation and migration
 - Bcrypt and Json Web Tokens for auth functions
 - HTML, CSS, and JavaScript