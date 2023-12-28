let form = document.getElementById('login_form');

$(document).ready(function() {
  $('form').submit(function(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    let jsonData = {};
    formData.forEach(function(value, key) {
      jsonData[key] = value;
    });

    $.ajax({
      url: "http://127.0.0.1:8000/api/v1/auth/login",
      type: 'POST',
      data: jsonData,
      success: function(response) {
        localStorage.setItem('kampusMalangNama', response.nama);
        localStorage.setItem('kampusMalangEmail', response.email);
        localStorage.setItem('kampusMalangTanggalLahir', response.tanggal_lahir);
        localStorage.setItem('kampusMalangGender', response.gender);
        localStorage.setItem('kampusMalangAlamat', response.alamat);
        localStorage.setItem('kampusMalangNomorTelepon', response.nomor_telepon);
        localStorage.setItem('kampusMalangPendidikan', response.pendidikan);
        localStorage.setItem('kampusMalangBukti', response.bukti);
        localStorage.setItem('kampusMalangJurusan', response.jurusan);
        localStorage.setItem('kampusMalangLogin', response.token);
        location.reload();
      },
      error: function() {
        alert('Error occurred during the request');
      }
    });
  });
});