async function signIn(){
    const url = "http://127.0.0.1:8080/project-1/login";
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

    //let token = res.headers.get('Token');
    //localStorage.setItem('jwt',token);

    console.log(response.status);
    if (response.status == 200){
        let user = await response.json();
        localStorage.setItem('userName',user.userName);
        localStorage.setItem('userRole',user.roleId);
        localStorage.setItem('userId',user.id);

        console.log(user.userName);

        window.location = './dashboard.html';

    }else {
        let errorMsg = await response.text();
        console.log(errorMsg);

        let errorElement = document.querySelector('#error-msg');
        errorElement.innerText = errorMsg;
        errorElement.style.color = 'red';
    }
}