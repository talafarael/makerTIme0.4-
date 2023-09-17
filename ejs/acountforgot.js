const resetpass = document.querySelector('#reset-pass');

resetpass.addEventListener('submit', async (event) => {
    event.preventDefault();

    
    const password  = event.target.elements.password.value;
    const urlkey=window.location.search
    const url=new URLSearchParams(urlkey)             
   const tokenurl=url.get('token')
    try {
        const response = await fetch('/auth/resetpassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password ,tokenurl}),
        });

       
        if (response.ok) {
            if(!response.ok){}
            console.log('fafa')
            
            console.log('Password reset successful');
        } else {
          
            console.error('Password reset failed');
        }
    } catch (error) {
      
        console.error('An error occurred', error);
    }
});