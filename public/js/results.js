function displaySearches(currentFood) {

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

// displayFood(currentFood)