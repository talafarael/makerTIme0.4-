const registrationForm = document.getElementById("registration-form");

// Получаем элемент для отображения сообщений об ошибке
const errorMessage = document.getElementById("error-message");

// Получаем элемент div для вывода данных
const outputDiv = document.getElementById("output");

// Обработчик события для отправки формы
registrationForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    // Получаем данные из формы
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;

    // Очищаем предыдущее сообщение об ошибке
    errorMessage.textContent = "";

    try {
        // Выполняем API-запрос для регистрации пользователя
        const response = await fetch("/auth/registration", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            // Обрабатываем ошибку из ответа сервера
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();

        // Отображаем данные ответа
        outputDiv.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        // Отображаем сообщение об ошибке, если возникла ошибка
        errorMessage.textContent = "Ошибка: " + error.message;
    }
});



const registrationForm2 = document.getElementById("login-form");

// Получаем элемент для отображения сообщений об ошибке
const errorMessage2 = document.getElementById("error-message2");

// Получаем элемент div для вывода данных
const outputDiv2 = document.getElementById("output2");

// Обработчик события для отправки формы
registrationForm2.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    // Получаем данные из формы
    const username = event.target.elements.username2.value;
    const password = event.target.elements.password2.value;

    // Очищаем предыдущее сообщение об ошибке
    errorMessage2.textContent = "";

    try {
        // Выполняем API-запрос для регистрации пользователя
        const response = await fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            // Обрабатываем ошибку из ответа сервера
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
       
       
        const data = await response.json();
        if (response.ok) {
          // Перенаправлення нак вазаний URL
          window.location.href = data.redirect;
        } else {
          // Обробка інших сценаріїв
        }
        // Отображаем данные ответа
        outputDiv2.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        // Отображаем сообщение об ошибке, если возникла ошибка
        errorMessage2.textContent = "Ошибка: " + error.message;
    }
});