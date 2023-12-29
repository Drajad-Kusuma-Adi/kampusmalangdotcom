let loginStatus = localStorage.getItem('kampusMalangLogin');

if (!loginStatus) {
  document.querySelector('#backToLanding').classList.remove('hidden');
  document.querySelector('#applications').classList.add('hidden');
} else {
  let tokenJson = JSON.stringify({ token: loginStatus });
  let jsonData = JSON.parse(tokenJson);

  $.ajax({
      url: "http://127.0.0.1:8000/api/v1/auth/check_login",
      type: 'POST',
      data: jsonData,
      success: function(response) {
        document.querySelector('#logout_form').classList.remove('hidden');
        document.querySelector('#username').innerHTML = 'User: @' + localStorage.getItem('kampusMalangNama');
        document.querySelector('#logout_token').value = localStorage.getItem('kampusMalangLogin');
      },
      error: function() {
        document.querySelector('#backToLanding').classList.remove('hidden');
        document.querySelector('#applications').classList.add('hidden');
      }
    });
}