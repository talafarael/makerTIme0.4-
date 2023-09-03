const sendlink=document.querySelector('#resend-pass')
sendlink.addEventListener('submit',async (event)=>{
    event.preventDefault();
    
   
    const email = event.target.elements.emailsend.value;
    await fetch("/auth/sendemailforgot", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email}),
    });
})