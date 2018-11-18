function generateRestaurants() {
    $.ajax({
        url: "/api/last-search/:id",
        method: "GET"
    }).then(function(res) {
        for (var i = 0; i < res[0].user_restaurant.length; i++) {
            var data = (res[0].user_restaurant[i])
            console.log(data.restaurant_name)

            // create div for food title and image
            var restaurantDiv = $("<div>")
            restaurantDiv.addClass("restaurantDiv")
            restaurantDiv.attr("data-food", data.restaurant_name)

            var pName = $("<p>").text(data.restaurant_name)
            pName.addClass("restaurantName")

            // create buttons
            var directionBtn = $("<button>")
            directionBtn.addClass("btn btn-primary")
            directionBtn.attr("id", "btn-directions")
            directionBtn.text(" Get Directions")
            var checkYes = $("<i>");
            checkYes.addClass("fas fa-directions");
            directionBtn.prepend(checkYes);


            var favBtn = $("<button>")
            favBtn.addClass("btn btn-light")
            favBtn.attr("id", "btn-fav")
            favBtn.text(" Favorite")
            var fafaNo = $("<i>");
            fafaNo.addClass("fa fa-heart");
            favBtn.prepend(fafaNo);

            restaurantDiv.append(pName)
            restaurantDiv.append(directionBtn)
            restaurantDiv.append(favBtn)

            $("#restaurant-result").append(restaurantDiv);
        }
    });
}

generateRestaurants()

function addFavorite() {
    $(document.body).on("click", "#btn-fav", function() {
        // console.log("favorited")
        $.ajax({
            url: "/api/favorites",
            method: "POST"
        }).then(function() {
            console.log("favorited")
        })
    })
}

addFavorite()
