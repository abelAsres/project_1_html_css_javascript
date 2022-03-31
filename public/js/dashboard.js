const url = "http://localhost:8080/"

let userName = localStorage.getItem('userName');
let userRole = localStorage.getItem('userRole');
let userId = localStorage.getItem('userId');
let role = userRole == 1 ? "Manager" : "Associate";

let logoutBtn = document.querySelector('#logout-btn');

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('jwt');

    window.location = '../index.html';
});

document.addEventListener("DOMContentLoaded", function(event) { 
    let titleSubtitle = document.querySelector('#user-title');

    titleSubtitle.innerHTML=userName + " | " + role;
});

function getUserReimbursements(){
let urlUserReimbursements = `${url}project-1/users/${userId}/reimbursements`;

    fetch(urlUserReimbursements, {
        method: 'GET'
    })
    .then(response =>{
        if(response.status === 200){
        response.json()
        .then(reimbursements =>{
            for(let reimbursement of reimbursements){
            createReimbursementCardComponent(reimbursement);
            }
        })
        .catch(errorMsg=>{
            console.log(`You ran into an error: ${errorMsg}`);
        })
    }})
    .catch(errorMsg =>{
        console.log(`You ran into an error: ${errorMsg}`);
    })
}

function logout(){

}