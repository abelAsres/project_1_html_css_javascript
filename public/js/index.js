let token = localStorage.getItem("jwt");


document.addEventListener("DOMContentLoaded", function(event) { 
    if(token != null){
        console.log("")
        let loginBtn  = document.querySelector('#login-btn');
        loginBtn.removeAttribute('href')
        loginBtn.innerHTML="Log out";
        loginBtn.addEventListener('click', () => {
            localStorage.removeItem('jwt');
        
            window.location = '../index.html';
        });

        let signUpBtn = document.querySelector('#signup-btn');
        signUpBtn.style.display="none";

        let dashboardBtn = document.querySelector('#dashboard-btn');
        dashboardBtn.style.display="";
    }
});