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