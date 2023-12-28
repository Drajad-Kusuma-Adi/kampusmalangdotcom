let form = document.getElementById('register_form');

$(document).ready(function() {
  $('form').submit(function(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    let jsonData = {};
    formData.forEach(function(value, key) {
      jsonData[key] = value;
    });

    $.ajax({
      url: "http://127.0.0.1:8000/api/v1/auth/register",
      type: 'POST',
      data: jsonData,
      success: function(response) {
        alert(response.message);
        location.reload();
      },
      error: function() {
        alert('Error occurred during the request');
      }
    });
  });
});