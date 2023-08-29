const password=document.querySelector('#pass-form')
const errorMessage = document.getElementById('error-message2');
fetch("/auth/emailsend", {
    method: 'POST',
})
.then(async (response) => {
    if (response.status === 401) {
        throw new Error('Токен отсутствует');
    } 
    
    const data = await response.json();
    if (data.message) {
        console.log('Сообщение сервера:', data.message);
    }
})
.catch((error) => {
    console.error('Ошибка при получении данных:', error);
});

password.addEventListener('submit',async(event )=>{
    event.preventDefault();
    const pass=event.target.elements.password2.value;
    errorMessage.textContent = "";

try {
        
    const response = await fetch('/auth/registerchaeck', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: pass })
    }); 
   
   
    if (!response.ok) {
            
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
    
    const data = await response.json();   
    window.location.href = data.redirect;
    
    
   
    
  
} catch (error) {
  
    errorMessage.textContent = 'Ошибка: ' + error.message;
}
})