const registrationForm = document.getElementById("registration-form");


const errorMessage = document.getElementById("error-message");

const outputDiv = document.getElementById("output");


registrationForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
   
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;

 
    errorMessage.textContent = "";

    try {
       
        const response = await fetch("/auth/registration", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        
        const data = await response.json();   
  window.location.href = data.redirect;
        
        
    } catch (error) {
        
        errorMessage.textContent = "Ошибка: " + error.message;
    }
});



const registrationForm2 = document.getElementById("login-form");


const errorMessage2 = document.getElementById("error-message2");


const outputDiv2 = document.getElementById("output2");


registrationForm2.addEventListener("submit", async (event) => {
    event.preventDefault();
    
 
    const username = event.target.elements.username2.value;
    const password = event.target.elements.password2.value;

  
    errorMessage2.textContent = "";

    try {
       
        const response = await fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
       
       
        const data = await response.json();
        if (response.ok) {
        
          window.location.href = data.redirect;
        }
  
        outputDiv2.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
   
        errorMessage2.textContent = "Ошибка: " + error.message;
    }
});