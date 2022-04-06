
//const url ="http://localhost:8080/project-1/login";
const url = "http://35.239.233.30:8080/project-1/login";

async function signIn(){
    let userName = document.getElementById('user-name');
    let password = document.getElementById('password');

    let userJSON = JSON.stringify({
        "userName": userName.value,
        "password": password.value
    });

    console.log(userJSON);

    let response =await fetch(url, {
        method: 'POST',
        body: userJSON,
    });

    if (response.status == 200){
        let user = await response.json();
        localStorage.setItem('userName',user.userName);
        localStorage.setItem('userRole',user.roleId);
        localStorage.setItem('userId',user.id);
        let token = response.headers.get('Token');
        localStorage.setItem('jwt', token);

        console.log(user.userName);

        window.location = '../html/dashboard.html';
        
    }else {
        let errorMsg = await response.text();
        console.log(errorMsg);

        let errorElement = document.querySelector('#error-msg');
        errorElement.innerText = errorMsg;
        errorElement.style.color = 'red';
    }
}