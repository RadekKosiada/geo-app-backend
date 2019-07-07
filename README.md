# Geocoding App 

Single page application showing a map and allowing user to see two chosen locations, marked on the map with markers. By default map is showing Germany. Zoom out to see other locations. You can look for cities, neighborhoods, sightseeing attractions etc. The page will display the type of the object and its geographical coordinates. 

## Frontend 

### Built with
* React.js
* React-Leaflet
* Axios

### UI Design 
Relates to the mockup, but some UX friendly solutions have been added.
Once the search query is, input and submit button disappears. The place of the input is taken by the name of the location. 
Once the coordinates are displayed two new buttons are added to the UI: Edit and Delete. They disappear after deleting the location and the Submit button is back.
Additional hover effects on buttons; 

### Further improvements to add:
Adding unit tests;
Refactoring of App.js, mainly to get rid of some repetitions in if blocks, to check which locations/input should be updated;
 
## Backend

### Built with:
* Node.js;
* Express.js;
* Axios;
* Body Parser;

* Coordinates and geocoding provided by [opencagedata.com API](opencagedata.com) 