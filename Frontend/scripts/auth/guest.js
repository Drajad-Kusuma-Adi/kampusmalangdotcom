let loginStatus = localStorage.getItem('kampusMalangLogin');

if (loginStatus) {
  let tokenJson = JSON.stringify({ token: loginStatus });
  let jsonData = JSON.parse(tokenJson);

  $.ajax({
      url: "http://127.0.0.1:8000/api/v1/auth/check_login",
      type: 'POST',
      data: jsonData,
      success: function(response) {
        window.location.href = 'guard/dashboard.html';
      },
      error: function() {
        console.log('Not logged in');
      }
    });
}