$.ajax({
    url: "http://127.0.0.1:8000/api/v1/get_notifications?token=" + localStorage.getItem("kampusMalangLogin"),
    type: "GET",
    xhrFields: {
        withCredentials: true
    },
    success: function(response) {
        // display as card
        response.forEach(function(object) {
            let card = document.createElement('div');
            card.classList.add('card');
            
            let header = document.createElement('header');
            header.classList.add('card-header');
            let h1 = document.createElement('h1');
            h1.textContent = object.universitas;
            header.appendChild(h1);
            
            let main = document.createElement('main');
            main.classList.add('card-main');
            let p1 = document.createElement('p');
            p1.textContent = 'Nama pendaftar: ' + object.nama;
            let p2 = document.createElement('a');
            p2.textContent = 'Jurusan: ' + object.jurusan;
            // let p3 = document.createElement('p');
            // p3.textContent = 'Deskripsi: ' + object.deskripsi;
            let p4 = document.createElement('p');
            p4.textContent = 'Alasan ingin mendaftar: ' + object.alasan;
            main.appendChild(document.createElement('br'));
            let p5 = document.createElement('p');
            p5.textContent = 'Status: ' + object.status;
            if (object.status === "pending") {
                p5.style.color = "blue";
            } else if (object.status === "accepted") {
                p5.style.color = "green";
            } else {
                p5.style.color = "red";
            }
            let p6 = document.createElement('p');
            p6.textContent = 'Waktu pendaftaran: ' + object.datetime;
            main.appendChild(p1);
            main.appendChild(document.createElement('br'));
            main.appendChild(p2);
            main.appendChild(document.createElement('br'));
            main.appendChild(document.createElement('br'));
            // main.appendChild(p3);
            // main.appendChild(document.createElement('br'));
            main.appendChild(p4);
            main.appendChild(document.createElement('br'));
            main.appendChild(document.createElement('hr'));
            main.appendChild(document.createElement('br'));
            main.appendChild(p5);
            main.appendChild(document.createElement('br'));
            main.appendChild(p6);
            main.appendChild(document.createElement('br'));
            if (object.datetime_accepted !== null) {
                let p7 = document.createElement('p');
                p7.textContent = 'Diterima pada: ' + object.datetime_accepted;
                main.appendChild(p7);
            }

            card.appendChild(header);
            card.appendChild(main);

            let container = document.querySelector('#mainContainer');
            container.appendChild(card);
        })

        // mark all as read
        // $.ajax({
        //     url: "http://127.0.0.1:8000/api/v1/read_notification?token=" + localStorage.getItem("kampusMalangLogin"),
        //     type: "POST",
        //     xhrFields: {
        //         withCredentials: true
        //     },
        //     success: function(response) {
        //         // idk
        //     },
        //     error: function() {
        //         alert("error on readin notifications")
        //     }
        // })
    },
    error: function() {
        alert("error on getting notifications");
    }
})