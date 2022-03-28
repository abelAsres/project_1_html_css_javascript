const url = "http://localhost:8080/"

let userName = localStorage.getItem('userName');
let userRole = localStorage.getItem('userRole');
let userId = localStorage.getItem('userId');
let role = userRole == 1 ? "Manager" : "Associate";

console.log(userName+" "+ userRole+ " "+ userId);

document.addEventListener("DOMContentLoaded", function(event) { 
  let titleSubtitle = document.querySelector('#user-subtitle');

  titleSubtitle.innerHTML=userName + " | " + role;

  if(role === "Manager"){
    getAllUsers();
  }else{
    getUserReimbursements();
  }
});

function createElement(elementType,className,elementInnerHtml){
  let element = document.createElement(elementType);

  if(elementInnerHtml){
    element.innerHTML= elementInnerHtml;
  }

  if(className){
    element.classList.add(className);
  }
  return element;
}

function createColumn(element){
  let divColumn = createElement('div','column');
  divColumn.appendChild(element);
  return divColumn;
}

function addToColumns(column){
  let divColumns = querySelector('.columns');
  divColumns.appendChild(column);
}

function createReimbursementCardComponent(reimbursement){
  let divCard = createElement('div','card');
  let divCardImg = createElement('div','card-image');
  let figureImage1 = document.createElement('figure','image');
  figureImage1.classList.add('is-4by3')
  let img1 = document.createElement('img');
  img1.setAttribute('src',reimbursement.imageLink);
  let divCardContent = createElement('div' ,'card-content');
  let divMedia = createElement('div','media');
  let divMediaLeft = createElement('div','media-left');
  let figureImage2 = document.createElement('figure','image');
  figureImage2.classList.add('is-48x48');
  let img2 = document.createElement('img');
  img2.setAttribute('src','https://bulma.io/images/placeholders/96x96.png');
  let divMediaContent = createElement('div','media-content');
  let pTitleIs4 = document.createElement('p','title');
  pTitleIs4.classList.add('is-4');
  //TODO 1: Add who the user is 
  pTitleIs4.innerHTML= hasResolver(reimbursement);
  let divContent = createElement('div','content',`Amount: ${reimbursement.amount} <br/> ${isResolved(reimbursement)} <br/> Status: ${reimbursement.status} </br> Type: ${reimbursement.type}`);
  let br = document.createElement('br');
  let time = document.createElement('time');
  time.setAttribute("datetime",'2022-1-1');
  let cardFooter = createElement('footer','card-footer');
  if(localStorage.getItem('userRole') == 1){
    let approve = createElement('button','card-footer-item');
    approve.addEventListener('click',approveReimbursement);
    approve.classList.add('is-primary');
    approve.classList.add('is-outlined');
    approve.innerHTML="Approve";
        
    let disapprove = createElement('button','card-footer-item');
    disapprove.addEventListener('click',disapproveReimbursement);
    disapprove.classList.add('is-danger');
    disapprove.classList.add('is-outlined');
    disapprove.innerHTML="Disapprove";

    cardFooter.appendChild(approve);
    cardFooter.appendChild(disapprove);
  }else{
    let edit = createElement('button','card-footer-item');
    edit.addEventListener('click',editReimbursement);
    edit.classList.add('is-primary');
    edit.classList.add('is-outlined');
    edit.innerHTML= "Edit";
    
    let remove = createElement('button','card-footer-item');
    remove.addEventListener('click',()=>{
      removeReimbursement(reimbursement)
    });
    remove.classList.add('is-danger');
    remove.classList.add('is-outlined');
    remove.innerHTML="Remove"
    
    cardFooter.appendChild(edit);
    cardFooter.appendChild(remove);
  }

  divCard.appendChild(divCardImg);
  divCardImg.appendChild(figureImage1);
  figureImage1.appendChild(img1);

  divCard.appendChild(divCardContent);
  divCardContent.appendChild(divMedia);
  divMedia.appendChild(divMediaLeft);
  divMediaLeft.appendChild(figureImage2);

  divCardContent.appendChild(divMediaContent);
  divMediaContent.appendChild(pTitleIs4);

  divCard.appendChild(divContent);
  
  divCard.appendChild(cardFooter);
  divContent.appendChild(br);
  divContent.appendChild(time);

  let column = createElement('div','column');

  column.appendChild(divCard);
  let mainColumnsDiv = document.querySelectorAll('.columns');

  let columnDiv = mainColumnsDiv[mainColumnsDiv.length-1];

  if (columnDiv.childNodes.length < 5){
    columnDiv.appendChild(column);
  }else{
    let newDivColumns = createElement('div','columns')
    newDivColumns.appendChild(column);
    document.body.appendChild(newDivColumns);
  }
}

function createUserCardComponent (user){
  let divCard = createElement('div','card');
  let divCardImg = createElement('div','card-image');
  let figureImage1 = document.createElement('figure','image');
  figureImage1.classList.add('is-4by3')
  let img1 = createElement('img','is-rounded');
  if(user.profilePic){
    console.log(user.profilePic);
    img1.setAttribute('src',user.profilePic);
  }else{
    img1.setAttribute('src','https://storage.googleapis.com/project-1-images/reciepitExample.PNG');
  }
  let divCardContent = createElement('div' ,'card-content');
  let divMediaContent = createElement('div','media-content');
  let pTitleIs4 = document.createElement('p','title');
  pTitleIs4.classList.add('is-4');
  //TODO 1: Add who the user is 
  pTitleIs4.innerHTML=user.userName;
  let pSubtitle6 = createElement('p','subtitle');
  pSubtitle6.classList.add('is-6');
  //TODO 2: Add user email address
  let emailATag = document.createElement('a');
  pSubtitle6.innerHTML=user.email;
  emailATag.appendChild(pSubtitle6);
  emailATag.setAttribute('mailto',user.email);
  let divContent = createElement('div','content',' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. <a>@bulmaio</a>.');
  let br = document.createElement('br');
  let time = document.createElement('time');
  time.setAttribute("datetime",'2022-1-1');

  
  divCard.appendChild(divCardImg);
  divCardImg.appendChild(figureImage1);
  figureImage1.appendChild(img1);

  divCard.appendChild(divCardContent);

  divCardContent.appendChild(divMediaContent);
  divMediaContent.appendChild(pTitleIs4);
  divMediaContent.appendChild(emailATag);


  let column = createElement('div','column');
  let aTag = document.createElement('a');

  aTag.appendChild(divCard);
  aTag.setAttribute('href',`${url}project-1/users/${user.id}/reimbursements`)

  column.appendChild(aTag);
  let mainColumnsDiv = document.querySelectorAll('.columns');

  let columnDiv = mainColumnsDiv[mainColumnsDiv.length-1];

  if (columnDiv.childNodes.length < 5){
    columnDiv.appendChild(column);
  }else{
    let newDivColumns = createElement('div','columns')
    newDivColumns.appendChild(column);
    document.body.appendChild(newDivColumns);
  }

}

function getAllUsers(){
  let urlAllUsers = `${url}project-1/users`;

  fetch(urlAllUsers, {
    method: 'GET'
  })
  .then(response =>{
    if(response.status === 200){
      response.json()
      .then(users =>{

        for(let user of users){
          console.log(`creating ${user.userName}`);
          createUserCardComponent(user);
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
          console.log(`creating ${reimbursement.id}`);
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

function approveReimbursement(){
  alert('you clicked approveREimbursemetn');
}

function disapproveReimbursement(){
  alert('you clicked disapproveREimbursemetn');
}

function editReimbursement(){
  alert('you clicked editREimbursemetn');
}

function removeReimbursement(reimbursement){
  const urlRemoveReimbursementById = url+`project-1/users/${userId}/reimbursements/${reimbursement.id}`;
  
  fetch(urlRemoveReimbursementById, {
    method: 'DELETE'
  })
  .then(response =>{
    if(response.status === 200){
      response.json()
      .then(isRemoved =>{
        console.log(isRemoved);
        if(isRemoved){
          console.log(`reloading reimbursements`);
          document.querySelector('.columns').innerHTML="";
          getUserReimbursements();
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

function hasResolver(reimbursement){
  return  reimbursement.resolver ? `Author: ${reimbursement.author} | Resover: ${reimbursement.resolver} ` : `Author: ${reimbursement.author}`;
}

function isResolved(reimbursement){
  return reimbursement.resolvedTime ? `Submitted Time: ${reimbursement.submittedTime} </br> Resolved Time: ${reimbursement.resolvedTime}` : `Submitted Time: ${reimbursement.submittedTime}`; 
}

function isActiveModal(){
  let modal = document.querySelector('.modal');
  modal.classList.contains('is-active') ? modal.classList.remove('is-active') : modal.classList.add('is-active');
  modal.classList.contains('is-active') ? addFileName : removeFileName;
}


function addFileName(){
  
    let input = document.querySelector('.file-input')
    let name = document.querySelector('.file-name')
    input.addEventListener('change', () => {
      let files = input.files
      if (files.length === 0) {
        name.innerText = 'No file selected'
      } else {
        name.innerText = files[0].name
      }
    })
  
}

function removeFileName(){
    // 2. Remove file name when form reset
    let forms = document.getElementsByTagName('form')
    for (let form of forms) {
      form.addEventListener('reset', () => {
        console.log('a')
        let names = form.querySelectorAll('.file-name')
        for (let name of names) {
          name.innerText = 'No file selected'
        }
      })
    }
}