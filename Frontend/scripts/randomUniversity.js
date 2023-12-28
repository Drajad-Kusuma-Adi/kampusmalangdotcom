$.ajax({
  url: "http://127.0.0.1:8000/api/v1/random_university?token=" + localStorage.getItem('kampusMalangLogin'),
  type: 'GET',
  success: function(response) {
  let count = 1;
  response.forEach(function(object) {
    let card = document.createElement('div');
    card.classList.add('card');

    let header = document.createElement('header');
    header.classList.add('card-header');
    let h1 = document.createElement('h1');
    h1.textContent = object.nama;
    header.appendChild(h1);

    let main = document.createElement('main');
    main.classList.add('card-main');
    let p1 = document.createElement('p');
    p1.textContent = 'Lokasi: ' + object.lokasi;
    let p2 = document.createElement('p');
    p2.textContent = object.deskripsi;
    main.appendChild(p1);
    main.appendChild(p2);

    let footer = document.createElement('footer');
    footer.classList.add('card-footer');
    let form = document.createElement('form');
    form.id = 'register_university_' + count;
    form.classList.add('register-form');
    footer.appendChild(form);

    let formHeading = document.createElement('h2');
    formHeading.innerHTML = 'Formulir Pendaftaran:';
    form.appendChild(formHeading);

    let token = document.createElement('input');
    token.type = 'hidden';
    token.name = 'token';
    token.id = 'token';
    token.value = localStorage.getItem('kampusMalangLogin');
    form.appendChild(token);

    let universityId = document.createElement('input');
    universityId.type = 'hidden';
    universityId.name = 'university_id';
    universityId.id = 'universityId';
    universityId.value = object.id;
    form.appendChild(universityId);

    $.ajax({
      url: `http://127.0.0.1:8000/api/v1/get_majors_by_university?university_id=${object.id}`,
      type: 'GET',
      success: function(response) {
      count = 1;
      response.forEach(function(object) {
        let majorRadio = 'majorRadio' + count;
        window[majorRadio] = document.createElement('input');
        window[majorRadio].type = 'radio';
        window[majorRadio].name = 'major_id';
        window[majorRadio].id = object.nama;
        window[majorRadio].value = object.id;

        let label = document.createElement('label');
        label.for = window[majorRadio].name;
        label.innerHTML = object.nama;

        form.appendChild(document.createElement('br'));
        form.appendChild(document.createElement('br'));
        form.appendChild(window[majorRadio]);
        form.appendChild(label);

        count++;
      });

      form.appendChild(document.createElement('br'));
      form.appendChild(document.createElement('br'));

      let appealBox = document.createElement('textarea');
      appealBox.name = 'appeal';
      appealBox.id = 'appeal';
      appealBox.rows = '10';
      appealBox.value = 'Berikan alasan Anda ingin mendaftar di sini...';
      form.appendChild(appealBox);

      form.appendChild(document.createElement('br'));
      form.appendChild(document.createElement('br'));

      let submitButton = document.createElement('button');
      submitButton.type = 'submit';
      submitButton.textContent = 'Daftar';
      form.appendChild(submitButton);
      },
      error: function() {
        alert("error on getting majors");
      }
    });

      card.appendChild(header);
      card.appendChild(main);
      card.appendChild(footer);

      let container = document.querySelector('#mainContainer');
      container.appendChild(card);

      count++;
    });

    document.querySelector('#mainContainer').addEventListener('submit', function(e) {
      e.preventDefault();

      let form = e.target.closest('.register-form');

      if (form) {
        let formData = new FormData(e.target);
        let jsonData = {};
        formData.forEach(function(value, key) {
          jsonData[key] = value;
        });

        $.ajax({
          url: "http://127.0.0.1:8000/api/v1/register_university",
          type: 'POST',
          data: jsonData,
          xhrFields: {
            withCredentials: true
          },
          success: function(response) {
            console.log(response);
          },
          error: function() {
            console.log('fail to register');
          }
        })
      }
    });
  },
  error: function() {
    alert('Something went wrong, please refresh page');
  }
});