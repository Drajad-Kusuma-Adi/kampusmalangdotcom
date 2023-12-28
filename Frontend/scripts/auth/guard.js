let loginStatus = localStorage.getItem('kampusMalangLogin');

if (!loginStatus) {
  window.location.href = '/bootcamp-kampusmalang/www/kampusmalang-fe/index.html';
} else {
  let tokenJson = JSON.stringify({ token: loginStatus });
  let jsonData = JSON.parse(tokenJson);

  $.ajax({
      url: "http://127.0.0.1:8000/api/v1/auth/check_login",
      type: 'POST',
      data: jsonData,
      success: function(response) {
        console.log("Logged in")
      },
      error: function() {
          window.location.href = '/bootcamp-kampusmalang/www/kampusmalang-fe/index.html';
      }
    });
}

document.getElementById('token').value = loginStatus;
document.getElementById('username').textContent = 'User: @' + localStorage.getItem('kampusMalangNama');