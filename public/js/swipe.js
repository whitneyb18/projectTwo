$(document).ready(function () {
    var map;
    var infowindow;

    var currentFood = 0;
    var typeOfFoodToSearch;
    var otherObject = [];

    $(document.body).on("click", "#btn-yes", function () {
        if (currentFood < 9) {
            typeOfFoodToSearch = foodTypeImage[currentFood].type
            currentFood++
            $("#swipeImg").empty();
            $("#buttonRow").empty();
            displayFood(currentFood)
            getGeolocation();
        } else {
            typeOfFoodToSearch = foodTypeImage[currentFood].type
            // console.log(typeOfFoodToSearch)
            getGeolocation();
          
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
            $("#swipeImg").empty()
            $("#buttonRow").empty();
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
            type: "mexican"
        },
        {
            image: "../images/foodTiles/italianFood.jpg",
            column: "food_type_1",
            type: "italian"
        },
        {
            image: "../images/foodTiles/bakeryFood.jpg",
            column: "food_type_2",
            type: "salad"
        },
        {
            image: "../images/foodTiles/americanFood.jpg",
            column: "food_type_3",
            type: "american"
        },
        {
            image: "../images/foodTiles/breakfastFood.jpg",
            column: "food_type_4",
            type: "breakfast"
        },
        {
            image: "../images/foodTiles/thaiFood.jpg",
            column: "food_type_5",
            type: "thai"
        },
        {
            image: "../images/foodTiles/chineseFood.jpg",
            column: "food_type_6",
            type: "chinese"
        },
        {
            image: "../images/foodTiles/indianFood.jpg",
            column: "food_type_7",
            type: "indian"
        },
        {
            image: "../images/foodTiles/pizzaFood.jpg",
            column: "food_type_8",
            type: "pizza"
        },
        {
            image: "../images/foodTiles/dessertFood.jpg",
            column: "food_type_9",
            type: "dessert"
        }
    ]

    function displayFood(currentFood) {

        // create div for food title and image
        var foodTypeDiv = $("<div>")
        foodTypeDiv.addClass("foodDiv")
        foodTypeDiv.attr("data-food", foodTypeImage[currentFood].type)

        var image = $("<img>").attr("src", foodTypeImage[currentFood].image)
        image.addClass("swipe-img")
        var type = $("<h3>").text(foodTypeImage[currentFood].type)
        type.addClass("foodText");

        // create buttons
        var yesBtn = $("<button>")
        yesBtn.addClass("btn btn-primary")
        yesBtn.attr("id", "btn-yes")
        var checkYes = $("<i>");
        checkYes.addClass("fas fa-check");
        yesBtn.append(checkYes);


        var noBtn = $("<button>")
        noBtn.addClass("btn btn-primary")
        noBtn.attr("id", "btn-no")
        var fafaNo = $("<i>");
        fafaNo.addClass("fas fa-times");
        noBtn.append(fafaNo);


        var buttonDiv = $("<div>");
        buttonDiv.addClass("centerButtons");

        foodTypeDiv.append(image)
        foodTypeDiv.append(type)


        buttonDiv.append(yesBtn);
        buttonDiv.append(noBtn);

        $("#swipeImg").append(foodTypeDiv);
        $("#buttonRow").append(buttonDiv);
    }

    displayFood(currentFood)


    //#################### Functions

    function getGeolocation() {
        var queryURL = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAN-Maosba3R24Xqxv3aT-ZHcZ16dbzbdA"
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
            query: typeOfFoodToSearch,
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
                // otherObject.push({type: typeOfFoodToSearch,
                //     name: results[i].name,
                //     address:results[i].formatted_address,
                //     placeId: results[i].place_id});
                    // console.log(otherObject)
                    $.ajax({
                        url: "/api/restaurants",
                        method: "POST",
                        data: {
                            type: typeOfFoodToSearch,
                            name: results[i].name,
                            address: results[i].formatted_address,
                            placeId: results[i].place_id
                        }
                    }).then(function() {
                        
                    })

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