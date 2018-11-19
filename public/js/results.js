// function to dynamically create results on the page
function generateRestaurants() {
    $.ajax({
        url: "/api/last-search/:id",
        method: "GET"
    }).then(function(res) {
        for (var i = 0; i < res[0].user_restaurant.length; i++) {
            var data = (res[0].user_restaurant[i])

            // create div for food title and image
            var restaurantDiv = $("<div>")
            restaurantDiv.addClass("restaurantDiv row")
            restaurantDiv.attr("data-foodID", data.id)

            var pName = $("<p>").text(data.restaurant_name)
            pName.addClass("restaurantName col-md-6")

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

            var favBtn = $("<button>")
            favBtn.addClass("btn btn-light col-md-3")
            favBtn.attr("id", "btn-fav")
            favBtn.attr("data-foodID", data.id)
            favBtn.text(" Favorite")
            var fafaNo = $("<i>");
            fafaNo.addClass("fa fa-heart");
            favBtn.prepend(fafaNo);

            restaurantDiv.append(pName)
            restaurantDiv.append(directionLink)
            restaurantDiv.append(favBtn)

            $("#restaurant-result").append(restaurantDiv);
        }
    });
}

// displays results on initial page load
generateRestaurants()

// adds a restaurant to a users favorites list when the favorite button is clicked
$(document.body).on("click", "#btn-fav", function() {
    // console.log("favorited")
    var restaurantId = $(this).attr("data-foodID")

    var apiURL = "/api/restaurants/" + restaurantId

    $.ajax({
        url: apiURL,
        method: "POST"
    }).then(function() {
        console.log("favorited")
    })
})

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