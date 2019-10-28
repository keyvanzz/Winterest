$(document).ready(function () {
  $(() => {
    $.ajax({
      method: "GET",
      url: "/users"
    })
    .done((users) => {
      users = users.users
      for(user of users) {
        $("<div>").text(user.name).appendTo($("body"));
      }
    });;
  });
});