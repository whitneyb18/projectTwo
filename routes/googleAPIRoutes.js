var db = require("../models");



module.exports = function (app) {


    app.post("/api/google", function (request, response) {

        // console.log(request.body)


        // getRestaurantInfomration()

        // function getRestaurantInfomration() {

        //################ executables

        var map;
        var infowindow;

        // getGeolocation();
        searchForFood();

        //#################### Functions 

        // function getGeolocation() {
        //     var queryURL = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAN-Maosba3R24Xqxv3aT-ZHcZ16dbzbdA"
        //     $.ajax({
        //         url: queryURL,
        //         method: "POST"

        //     }).then(function (response) {
        //         yourLocationInformation = {
        //             lat: response.location.lat,
        //             lng: response.location.lng
        //         }
        //         searchForFood(yourLocationInformation)
        //         // console.log(yourLocationInformation)
        //     });
        // };

        function searchForFood(yourLocationInformation) {

            var userLocation = {
                lat: 40.7608,
                lng: -111.8910
            }
            map = new google.maps.Map(document.getElementById('map'), {
                center: userLocation,
                zoom: 15
            });

            infowindow = new google.maps.InfoWindow();
            var service = new google.maps.places.PlacesService(map);
            service.textSearch({
                location: userLocation,
                radius: 1000,
                type: ['restaurant'],
                query: request.body[0],
            }, callback);
        }


        function callback(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                    console.log(results[i])
                    console.log(results[i].name)
                    console.log(results[i].formatted_address)
                }
            }
        }

        function createMarker(place) {
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent(place.name);
                infowindow.open(map, this);
            });
        }


    });


}