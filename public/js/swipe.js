$(document).ready(function () {

    var currentFood = 0;

    $(document.body).on("click", "#btn-yes", function () {
        if (currentFood < 9) {
            console.log("yes")
            currentFood++
            $("#swipe-box").empty()
            displayFood(currentFood)
        } else {
            alert("thinking");
        }
    });

    $(document.body).on("click", "#btn-no", function () {
        if (currentFood < 9) {
            console.log("no")
            console.log(foodTypeImage.length);
            currentFood++
            $("#swipe-box").empty()
            displayFood(currentFood)
        } else {
            alert("thinking...")
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




})