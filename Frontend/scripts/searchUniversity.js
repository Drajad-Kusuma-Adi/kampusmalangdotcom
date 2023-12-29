document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
 
    let formData = new FormData(e.target);
    let jsonData = {};
    formData.forEach(function(value, key) {
        jsonData[key] = value;
    });
 
    function ajaxRequest(type, query) {
        $.ajax({
            url: "http://127.0.0.1:8000/api/v1/search_" + type + "?query=" + query,
            type: 'GET',
            success: function(response) {
                document.querySelector('#cardContainer').innerHTML = '';
                let count = 1;
                loginStatus = localStorage.getItem('kampusMalangLogin');
                if (!loginStatus) {
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
                        p1.textContent = 'Alamat: ' + object.lokasi;
                        let p2 = document.createElement('p');
                        p2.textContent = object.deskripsi;
                        let p3 = document.createElement('p');
                        p3.textContent = 'Kontak: ' + object.kontak
                        let ahref = document.createElement('a');
                        ahref.textContent = 'Website: ' + object.website;
                        ahref.href = object.website;
                        let p4 = document.createElement('p');
                        p4.textContent = 'Biaya pendaftaran: ' + object.biaya;
                        main.appendChild(p1);
                        main.appendChild(document.createElement('br'));
                        main.appendChild(p2);
                        main.appendChild(document.createElement('br'));
                        main.appendChild(p3);
                        main.appendChild(ahref);
                        main.appendChild(p4);
                    
                        let footer = document.createElement('footer');
                        footer.classList.add('card-footer');
                        let form = document.createElement('form');
                        form.id = 'register_university_' + count;
                        form.classList.add('register-form');
                        form.method = 'post';
                        footer.appendChild(form);
                    
                        let formHeading = document.createElement('h3');
                        formHeading.innerHTML = 'Jurusan:';
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
                        let majorsList = document.createElement('ul');
                        response.forEach(function(object) {
                            let major = document.createElement('li');
                            major.innerHTML = object.nama;
                            major.style.marginTop = '5px';
                
                            form.appendChild(major);
                        });
                    
                        form.appendChild(document.createElement('br'));
                        form.appendChild(document.createElement('br'));
                    
                        let loginCta = document.createElement('a');
                        loginCta.href = '../login.html';
                        loginCta.innerHTML = 'Mau daftar? Tekan di sini untuk login dulu';
                        form.appendChild(loginCta);
                    
                        },
                        error: function() {
                            alert("error on getting majors");
                        }
                        });
                    
                        card.appendChild(header);
                        card.appendChild(main);
                        card.appendChild(footer);
                    
                        let container = document.querySelector('#cardContainer');
                        container.appendChild(card);
                    
                        count++;
                        });
                } else {
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
                        p1.textContent = 'Alamat: ' + object.lokasi;
                        let p2 = document.createElement('p');
                        p2.textContent = object.deskripsi;
                        let p3 = document.createElement('p');
                        p3.textContent = 'Kontak: ' + object.kontak
                        let ahref = document.createElement('a');
                        ahref.textContent = 'Website: ' + object.website;
                        ahref.href = object.website;
                        let p4 = document.createElement('p');
                        p4.textContent = 'Biaya pendaftaran: ' + object.biaya;
                        main.appendChild(p1);
                        main.appendChild(document.createElement('br'));
                        main.appendChild(p2);
                        main.appendChild(document.createElement('br'));
                        main.appendChild(p3);
                        main.appendChild(ahref);
                        main.appendChild(p4);
                    
                    
                        let footer = document.createElement('footer');
                        footer.classList.add('card-footer');
                        let form = document.createElement('form');
                        form.id = 'register_university_' + count;
                        form.classList.add('register-form');
                        form.method = 'post';
                        footer.appendChild(form);
                    
                        let formHeading = document.createElement('h3');
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
                        submitButton.classList.add('register-btn');
                        form.appendChild(submitButton);
                    
                        form.appendChild(document.createElement('br'));
                        form.appendChild(document.createElement('br'));
                    
                        let loginCta = document.createElement('a');
                        loginCta.href = '../login.html';
                        loginCta.innerHTML = 'Mau daftar? Tekan di sini untuk ogin dulu';
                        form.setAttribute('guarded-form', 'true');
                        loginCta.classList.add('login-cta');
                        loginCta.classList.add('hidden');
                        form.appendChild(loginCta);
                    
                        },
                        error: function() {
                            alert("error on getting majors");
                        }
                        });
                    
                        card.appendChild(header);
                        card.appendChild(main);
                        card.appendChild(footer);
                    
                        let container = document.querySelector('#cardContainer');
                        container.appendChild(card);
                    
                        count++;
                        });

                        document.querySelector('#mainContainer').addEventListener('submit', function(e) {
                        e.preventDefault();
                    
                        let registerForm = e.target.closest('.register-form');
                    
                        if (registerForm) {
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
                                location.reload();
                                console.log(response);
                            },
                            error: function() {
                                location.reload();
                                console.log('fail to register');
                            }
                            })
                        }
                        });
                    }
            },
            error: function() {
                alert('error on search');
            }
        });
    }
 
    if (jsonData.searchType === 'university') {
        ajaxRequest('university', jsonData.query);
    } else if (jsonData.searchType === 'major') {
        ajaxRequest('major', jsonData.query);
    }
 });
 