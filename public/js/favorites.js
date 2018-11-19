// function to dynamically create results on the page
function generateFavorites(res) {
    // empty div of previous results
    $("#favorite-result").empty()

    for (var i = 0; i < res[0].user_favorite.length; i++) {
        var data = (res[0].user_favorite[i])
        console.log(data.restaurant_name)

        // create div for food title and image
        var favoritesDiv = $("<div>")
        favoritesDiv.addClass("favoritesDiv row")
        favoritesDiv.attr("data-foodID", data.id)

        var pName = $("<p>").text(data.restaurant_name)
        pName.addClass("favRestaurantName col-sm-6")

        // create buttons
        var directionLink = $("<a>");
        directionLink.attr("target","_blank");
        directionLink.attr("href","https://www.google.com/maps/dir//" + data.restaurant_name + "," + data.restaurant_address);
        var directionBtn = $("<button>");
        directionBtn.addClass("btn btn-primary col-md-3");
        directionBtn.attr("id", "btn-directions");
        directionBtn.text(" Get Directions");
        var checkYes = $("<i>");
        checkYes.addClass("fas fa-directions");
        directionBtn.prepend(checkYes);
        directionLink.prepend(directionBtn);

        // eventually we'll add in unfavoriting a restaurant, will need this then
        // var favBtn = $("<button>")
        // favBtn.addClass("btn btn-light")
        // favBtn.attr("id", "btn-fav")
        // favBtn.attr("data-foodID", data.id)
        // favBtn.text(" Favorite")
        // var fafaNo = $("<i>");
        // fafaNo.addClass("fa fa-heart");
        // favBtn.prepend(fafaNo);

        favoritesDiv.append(pName)
        favoritesDiv.append(directionLink)
        // favoritesDiv.append(favBtn)

        $("#favorite-result").append(favoritesDiv);
    }
};

// dispaly all results
function getAllFavorites() {
    $.ajax({
        url: "/api/favorites/:id",
        method: "GET"
    }).then(function(res) {
        generateFavorites(res)
    });
};

// display results for a specific type of food
function getTypeFavorites(foodType) {
    if (foodType === "all") {
        getAllFavorites()
    } else {
        $.ajax({
            url: "/api/favorites/" + foodType + "/:id",
            method: "GET"
        }).then(function(res) {
            generateFavorites(res)
        });
    }
};

// on inital load of the page display all favorites
getAllFavorites()

// when filter is selected display results of that type
$("#filter-favorites").on("change", function() {
    foodType = $("#filter-favorites").val()
    getTypeFavorites(foodType)
});

// log out when log out CTA in header is clicked
$("#logout").on('click', function (event) {
    event.preventDefault();
  
    $.ajax({
      url: "/api/logout",
      method: "GET"
    }).then(function (res) {
        location.href = "/"
    })
  })