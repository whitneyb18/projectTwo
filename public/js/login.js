$("#signIn").on('click', function(event){
  event.preventDefault();
  console.log('clicked');
  var userData = {
    email: $('#loginEmail').val().trim(),
    password: $('#loginPassword').val().trim()
  }
  console.log(userData);
  $.ajax({
    url: "/api/login",
    method: "POST",
    data: userData
  }).then(function(res){
    console.log(res);
    // $.ajax({
    //       url: "/api/session",
    //       method: "GET",
    //     }).then(function(res){
    //       console.log(res);
    //     })
    location.href = "/profile"
  })
});

$("#signUp").on('click', function (event) {
  event.preventDefault();
  console.log('clicked');
  var userData = {
    first_name: $('#signupFirstName').val().trim(),
    last_name: $('#signupLastName').val().trim(),
    email: $('#signupEmail').val().trim(),
    password: $('#signupPassword').val().trim()
  };
  console.log(userData);
  $.ajax({
    url: "/api/users",
    method: "POST",
    data: userData
  }).then(function (res) {
    console.log(res);
    location.href = "/profile"
  })
});

$("#logout").on('click', function (event) {
  event.preventDefault();

  $.ajax({
    url: "/api/logout",
    method: "GET"
  }).then(function (res) {
    console.log(res);
  })
})
