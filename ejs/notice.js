let buled=false
let authLink = document.getElementById("authLink");
let arr = [];
const registrationForm = document.getElementById('notice-form');

const errorMessage = document.getElementById('error-message');
const titleChange=document.querySelector('.titleChange')

const content = document.querySelector('.content-notice');
 const butttonchange=document.querySelector('.changer');
const noticeChange=document.querySelector('.noticeChange');

function switcher(buled){
    if (buled) {
        authLink.href = "/logout"; 
        authLink.textContent = "Выход";
    } else {
        authLink.href = '/index'; 
        authLink.textContent = "Регистрация"; 
    }
}
function generateNoticeTitles() {
    content.innerHTML = ''; 

    arr.forEach((elem) => {
        content.innerHTML += `
 <div id="div${elem.id}">
        <div>${elem.notice}</div>
        <div>${elem.title}</div>
            <button class='button-delet' id="${elem.id}" type="submit">delete</button>
            <button class='change' id="${elem.id}" type="submit">change</button>
    </div>`;
    });
    addDeleteButtonEventListeners();
    changeButton();
}

fetch('/auth/creatnotice')
    .then((response) => {
        if (response.status === 401) {
            buled = false;
            switcher(buled);
            throw new Error('Токен отсутствует');
        }
        return response.json();
    })
    .then((data) => {
        if (Array.isArray(data)) {
            arr = data;
            if (arr.length >= 0) {
                buled = true;
            }
            switcher(buled);
            generateNoticeTitles();
            console.log(arr);
        } else {
            console.error('Полученные данные не являются массивом:', data);
        }
    })
    .catch((error) => {
        console.error('Ошибка при получении данных:', error);
    });

registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();

   
    const notice = event.target.elements.username.value;
    const title = event.target.elements.notice.value;

    
    errorMessage.textContent = '';

    try {
        
        const response = await fetch('/auth/notice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ notice, title }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();
        arr = data.nodes;
        generateNoticeTitles();
    } catch (error) {
      
        errorMessage.textContent = 'Ошибка: ' + error.message;
    }
});
function addDeleteButtonEventListeners() {
    const deleteButtons = document.querySelectorAll('.button-delet');

    deleteButtons.forEach((button) => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            const id = button.id;
            const main = document.getElementById(`div${id}`);
            main.remove();
            try {
                const response = await fetch('/auth/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                });

                if (response.ok) {
                } else {
                    console.log('Произошла ошибка при отправке ID на сервер');
                }
            } catch (e) {
                console.log(e);
            }
        });
    });
}

function changeButton() {
    const change = document.querySelectorAll('.change');
   
    change.forEach((button) => {
        button.addEventListener('click',async (e) => {
            e.preventDefault();
            const id = button.id; 
            butttonchange.setAttribute('id', `${id}`);
          
         console.log(id)
        });
    });
}
butttonchange.addEventListener('click', async (e) => {
    e.preventDefault();
    const id = butttonchange.id;
    const Changenot = noticeChange.value;
    const Changetit = titleChange.value;
    
    try {
        const response = await fetch('/auth/change', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Changenot, id, Changetit })

        });
       
        if (response.ok) {
           
        } else {
            console.log('Произошла ошибка при отправке данных на сервер');
        }
        generateNoticeTitles()
    } catch (e) {
        console.log(e);
    }
});