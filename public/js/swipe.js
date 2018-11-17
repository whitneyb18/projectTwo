$(document).ready(function () {
    var map;
    var infowindow;

    var currentFood = 0;
    var typeOfFoodToSerach;
    var otherObejct = [];

    $(document.body).on("click", "#btn-yes", function () {
        if (currentFood < 9) {
            typeOfFoodToSerach = foodTypeImage[currentFood].type
            currentFood++
            $("#swipe-box").empty()
            displayFood(currentFood)
            getGeolocation();
        } else {
            typeOfFoodToSerach = foodTypeImage[currentFood].type
            // console.log(typeOfFoodToSerach)
            getGeolocation();
            // console.log(otherObejct)
            $.ajax({
                url: "/results",
                method: "GET"
            }).then(function() {
                location.href = "/results"
            })
        }

    });

    $(document.body).on("click", "#btn-no", function () {
        if (currentFood < 9) {
            currentFood++
            $("#swipe-box").empty()
            displayFood(currentFood)
        } else {
            $.ajax({
                url: "/results",
                method: "GET"
            }).then(function() {
                location.href = "/results"
            })
        }

    });

    var foodTypeImage = [{
            image: "../images/foodTiles/mexicanFood.jpg",
            column: "food_type_0",
            type: "Mexican"
        },
        {
            image: "../images/foodTiles/italianFood.jpg",
            column: "food_type_1",
            type: "Italian"
        },
        {
            image: "../images/foodTiles/bakeryFood.jpg",
            column: "food_type_2",
            type: "Soup, Salad, Sandwiches"
        },
        {
            image: "../images/foodTiles/americanFood.jpg",
            column: "food_type_3",
            type: "American"
        },
        {
            image: "../images/foodTiles/breakfastFood.jpg",
            column: "food_type_4",
            type: "Breakfast"
        },
        {
            image: "../images/foodTiles/thaiFood.jpg",
            column: "food_type_5",
            type: "Thai"
        },
        {
            image: "../images/foodTiles/chineseFood.jpg",
            column: "food_type_6",
            type: "Chinese"
        },
        {
            image: "../images/foodTiles/indianFood.jpg",
            column: "food_type_7",
            type: "Indian"
        },
        {
            image: "../images/foodTiles/pizzaFood.jpg",
            column: "food_type_8",
            type: "Pizza"
        },
        {
            image: "../images/foodTiles/dessertFood.jpg",
            column: "food_type_9",
            type: "Dessert"
        }
    ]

    function displayFood(currentFood) {

        var foodTypeDiv = $("<div>")
        foodTypeDiv.addClass("foodDiv")
        foodTypeDiv.attr("data-food", foodTypeImage[currentFood].type)

        var image = $("<img>").attr("src", foodTypeImage[currentFood].image)
        image.addClass("swipe-img")
        var type = $("<p>").text(foodTypeImage[currentFood].type)
        type.addClass("foodText");

        var yesBtn = $("<button>").text("Yes")
        yesBtn.addClass("btn btn-primary")
        yesBtn.attr("id", "btn-yes")


        var noBtn = $("<button>").text("No")
        noBtn.addClass("btn btn-primary")
        noBtn.attr("id", "btn-no")

        foodTypeDiv.append(image)
        foodTypeDiv.append(type)
        foodTypeDiv.append(yesBtn)
        foodTypeDiv.append(noBtn)

        $("#swipe-box").append(foodTypeDiv);
    }

    displayFood(currentFood)


    //#################### Functions

    function getGeolocation() {
        var queryURL = "https://www.googleapis.com/geolocation/v1/geolocate?key="
        $.ajax({
            url: queryURL,
            method: "POST"

        }).then(function (response) {
            yourLocationInformation = {
                lat: response.location.lat,
                lng: response.location.lng
            }
            searchForFood(yourLocationInformation)
            // console.log(yourLocationInformation)
        });
    };

    function searchForFood(yourLocationInformation) {

        var userLocation = yourLocationInformation
        map = new google.maps.Map(document.getElementById('map'), {
            center: userLocation,
            zoom: 15
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.textSearch({
            location: userLocation,
            radius: 500,
            type: ['restaurant'],
            query: typeOfFoodToSerach,
        }, callback);
    }


    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            // limiting only to three.
            for (var i = 0; i < 3; i++) {
                createMarker(results[i]);
                // console.log(results[i])
                // console.log(results[i].name)
                // console.log(results[i].formatted_address)
                // console.log(results[i].place_id)
                otherObejct.push({name: results[i].name,
                    address:results[i].formatted_address,
                    placeId: results[i].place_id});
                    console.log(otherObejct)

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

})