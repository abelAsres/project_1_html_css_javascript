const url = "http://localhost:8080/"

document.addEventListener("DOMContentLoaded", function(event) { 
    let titleSubtitle = document.querySelector('#user-subtitle');

    let userName = localStorage.getItem('userName');
    let userRole = localStorage.getItem('userRole');

    console.log(userRole);
    let role = userRole == 1 ? "Manager" : "Associate";
    
    titleSubtitle.innerHTML=userName + " | " + role;

    //let url = "http://localhost:8080/project-1/users";

    if(role === "Manager"){
      getAllUsers();
    }else{
      getUserReimbursements();
    }
    // fetch(url, {
    //   method: 'GET'
    // })
    // .then(response =>{
    //   if(response.status === 200){
    //     response.json()
    //     .then(users =>{
    //       for (let i = 0; i < users.length;i++){
    //         createUserCardComponent();
    //       }
    //     })
    //     .catch(errorMsg=>{
    //       console.log(`You ran into an error: ${errorMsg}`);
    //     })
    // }})
    // .catch(errorMsg =>{
    //   console.log(`You ran into an error: ${errorMsg}`);
    // })
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

  async function getAllUsersAndReimbRequests(){
    const url = "";
    
    let response =await fetch(url, {
      method: 'GET',
      body: userJSON,
    });
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

function createReimbursementCardComponent(){
  let divCard = createElement('div','card');
  let divCardImg = createElement('div','card-image');
  let figureImage1 = document.createElement('figure','image');
  figureImage1.classList.add('is-4by3')
  let img1 = document.createElement('img');
  img1.setAttribute('src','https://storage.googleapis.com/project-1-images/reciepitExample.PNG');
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
  pTitleIs4.innerHTML= user.userName;
  let pSubtitle6 = createElement('p','subtitle');
  pSubtitle6.classList.add('is-6');
  //TODO 2: Add user email address
  pSubtitle6.innerHTML=user.email;
  let divContent = createElement('div','content',' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. <a>@bulmaio</a>.');
  let br = document.createElement('br');
  let time = document.createElement('time');
  time.setAttribute("datetime",'2022-1-1');

  divCard.appendChild(divCardImg);
  divCardImg.appendChild(figureImage1);
  figureImage1.appendChild(img1);

  divCard.appendChild(divCardContent);
  divCardContent.appendChild(divMedia);
  divMedia.appendChild(divMediaLeft);
  divMediaLeft.appendChild(figureImage2);

  divCardContent.appendChild(divMediaContent);
  divMediaContent.appendChild(pTitleIs4);
  divMediaContent.appendChild(pSubtitle6);

  divCard.appendChild(divContent);
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
  let img1 = document.createElement('img');
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
        //for (let i = 0; i < users.length;i++){
          
         // createUserCardComponent();
       // }
      })
      .catch(errorMsg=>{
        console.log(`You ran into an error: ${errorMsg}`);
      })
  }})
  .catch(errorMsg =>{
    console.log(`You ran into an error: ${errorMsg}`);
  })
}