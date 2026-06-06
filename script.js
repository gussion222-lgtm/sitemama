
window.onload = function() {
    const popupForm = document.getElementById('popup-form');
    const form = document.getElementById('cheburek-form');
    const closeButton = document.querySelector('.close-button');

    popupForm.classList.add('show');

    closeButton.onclick = function() {
        popupForm.classList.remove('show');
    }

    form.onsubmit = function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const subscription = document.getElementById('subscription').checked ? 1 : 0;

        let valid = true;

        document.getElementById('name-error').textContent = '';
        document.getElementById('phone-error').textContent = '';
        document.getElementById('email-error').textContent = '';

        const nameRegex = /^[A-Za-zА-Яа-яЁё\s]+$/;
        if (!name) {
            document.getElementById('name-error').textContent = 'Это поле должно быть заполнено';
            valid = false;
        } else if (!nameRegex.test(name)) {
            document.getElementById('name-error').textContent = 'Имя не должно содержать цифры или спецсимволы';
            valid = false;
        }

        const phoneRegex = /^[0-9\s\-\+]{10,15}$/;
        if (!phone) {
            document.getElementById('phone-error').textContent = 'Это поле должно быть заполнено';
            valid = false;
        } else if (!phoneRegex.test(phone)) {
            document.getElementById('phone-error').textContent = 'Введите корректный номер телефона (С +7 или 8)';
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            document.getElementById('email-error').textContent = 'Это поле должно быть заполнено';
            valid = false;
        } else if (!emailRegex.test(email)) {
            document.getElementById('email-error').textContent = 'Введите корректный адрес электронной почты';
            valid = false;
        }

        if (valid) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('phone', phone);
            formData.append('email', email);
            formData.append('subscription', subscription);

            fetch('submit.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                if (data === "Этот номер телефона уже использовался") {
                    document.getElementById('phone-error').textContent = data;
                } else if (data === "Этот email уже использовался") {
                    document.getElementById('email-error').textContent = data;
                } else {
                    alert(data);
                    popupForm.classList.remove('show');
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
        }
    }
}




document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', function() {
        const fullText = this.parentElement.nextElementSibling;
        const previewText = this.parentElement;

        if (fullText.style.display === 'none' || fullText.style.display === '') {
            fullText.style.display = 'block';
            previewText.style.display = 'none';
            this.style.display = 'none';
        }
    });
});

document.querySelectorAll('.comment-full').forEach(fullText => {
    fullText.style.display = 'none';
});

function checkVisibility() {
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            el.classList.add('visible');
            el.classList.remove('hidden');
        }
    });
}

window.addEventListener('scroll', checkVisibility);

document.addEventListener('DOMContentLoaded', checkVisibility);

$(document).ready(function(){
    $('.photo-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: window.innerWidth > 768,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});

function doGet(e) {
    return HtmlService.createHtmlOutput("Request received!");
}

function appendRow(name, phone, email, subscription) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([name, phone, email, subscription, new Date()]);
}

$(document).ready(function(){
    $('.menu-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        infinite: true,
        autoplay: false,
        arrows: true
    });
});




