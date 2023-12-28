let form = document.getElementById('logout_form');

$(document).ready(function() {
  $('form').submit(function(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    let jsonData = {};
    formData.forEach(function(value, key) {
      jsonData[key] = value;
    });

    $.ajax({
      url: "http://127.0.0.1:8000/api/v1/auth/logout",
      type: 'POST',
      data: jsonData,
      success: function(response) {
        localStorage.removeItem('kampusMalangNama', response.nama);
        localStorage.removeItem('kampusMalangEmail', response.email);
        localStorage.removeItem('kampusMalangTanggalLahir', response.tanggal_lahir);
        localStorage.removeItem('kampusMalangGender', response.gender);
        localStorage.removeItem('kampusMalangAlamat', response.alamat);
        localStorage.removeItem('kampusMalangNomorTelepon', response.nomor_telepon);
        localStorage.removeItem('kampusMalangPendidikan', response.pendidikan);
        localStorage.removeItem('kampusMalangBukti', response.bukti);
        localStorage.removeItem('kampusMalangJurusan', response.jurusan);
        localStorage.removeItem('kampusMalangLogin', true);
        location.reload();
      },
      error: function() {
        alert('Error occurred during the request');
      }
    });
  });
});