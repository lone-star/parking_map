Parking Map
===========

Find parking spots on a map

# Usage

The installation is in 7 steps:

1. clone repository `git clone git@github.com:lone-star/parking_map.git`
2. install [node.js](http://nodejs.org/)
3. install [gulp](https://github.com/gulpjs/gulp)
4. install all dependencies: `cd parking_map; npm install`
5. copy the settings file: `cp ./app/src/settings.json.example ./app/src/settings.json`
6. set your Google Maps API Key: `vim ./app/src/settings.json`
7. start the server: `gulp`

Enjoy @ localhost:3000

# Build Script

The build script does 5 things:

1. clean `build/js` and `build/css` directories
2. compile scripts
3. compile styles
4. start the server
5. keep the build updated

## Compile scripts

The application uses Browserify in order to manage dependencies. The application endpoint is `./app/src/app.js`. Browserify will resolve all dependencies, they will them be compiled in the file `./build/js/app.min.js`. In order to handle our Handlebars templates, we will use a custom function to compile our templates and include them inside the final build. This is defined in `./libs/handlebars_assets.js`.

## Compile styles

We use the Less preprocessor to compile our stylesheets. Less files are compiled into css, and bundled inside `./build/css/app.min.css`.

## Start the server

The application uses a simple express.js webserver (located in `./server.js`). It has 3 purposes:

1. Serving our main `./index.html` file in `/`
2. Giving access to static scripts via `/static`
3. Proxying the parkatmyhouse API via `/api`

## Keeping the build updated

A script watches modifications on js, less or hbs files. On every modification, it recompiles the assets.

# The Client Application

The client application is built with Backbone.js, it consists of 4 modules:

- LocationCollection
- SearchView
- MapView
- DetailsView

## LocationCollection

The LocationCollection searches for parking locations according to a query string. It also keep the state of the application by enabling the selection of a location. When a location is selected, it triggers a event to update its observers.

## SearchView

The SearchView takes in searches from the UI. It offers autocomplete via the Google Maps Autocomplete service. Its sends the search queries to the LocationCollection.

## MapView

The MapView will handle all operations related to the map. It listens for `reset` and `locationSelected` events on the LocationCollection.
On receiving a `reset` event, it updates the list of markers on the map. When a `locationSelected` event occurs, it displays the path from the selected location to the searched location.

## DetailsView

The DetailsView displays all the information relative to the currently selected location. When the LocationCollection triggers a `locationSelected` event, it will update the DOM with the newly selected location.
