$(document).ready(function() {

    var currentFood = 0;

    $(document.body).on("click", "#btn-yes", function() {
        console.log("yes")
        currentFood++
        $("#swipe-box").empty()
        displayFood(currentFood)
        console.log(currentFood)
    });
    
    $(document.body).on("click", "#btn-no", function() {
        if (currentFood < foodTypeImage.length) {
            console.log("no")
            currentFood++
            $("#swipe-box").empty()
            displayFood(currentFood)
            console.log(currentFood)
        }
        else {alert("thinking...")}
        

        
    });
    
    var foodTypeImage = [
        {
            image: "../images/angela-pham-472148-unsplash opaque.jpg",
            column: "food_type_0",
            type: "Mexican"
        },{
            image: "../images/christine-siracusa-363257-unsplash.jpg",
            column: "food_type_1",
            type: "Italian"
        },{
            image: "../images/eaters-collective-132773-unsplash opaque.jpg",
            column: "food_type_2",
            type: "Asian"
        }
    ]
    
    function displayFood(currentFood) {
    
        var foodTypeDiv = $("<div>")
        foodTypeDiv.addClass("foodDiv")
        foodTypeDiv.attr("data-food", foodTypeImage[currentFood].type)
        
        var image = $("<img>").attr("src",foodTypeImage[currentFood].image)
        image.addClass("swipe-img")
        var type = $("<p>").text(foodTypeImage[currentFood].type)
    
        var yesBtn = $("<button>").text("Yes")
        yesBtn.addClass("btn btn-primary")
        yesBtn.attr("id","btn-yes")
    
    
        var noBtn = $("<button>").text("No")
        noBtn.addClass("btn btn-primary")
        noBtn.attr("id","btn-no")
    
        foodTypeDiv.append(image)
        foodTypeDiv.append(type)
        foodTypeDiv.append(yesBtn)
        foodTypeDiv.append(noBtn)
    
        $("#swipe-box").append(foodTypeDiv);
    }
    
    
    
    
    displayFood(currentFood)
    


    
})


