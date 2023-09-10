const resetpass = document.querySelector('#reset-pass');

resetpass.addEventListener('submit', async (event) => {
    event.preventDefault();

    
    const password  = event.target.elements.password.value;

    try {
        const response = await fetch('/auth/resetpassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });

       
        if (response.ok) {
     
            console.log('Password reset successful');
        } else {
          
            console.error('Password reset failed');
        }
    } catch (error) {
      
        console.error('An error occurred', error);
    }
});