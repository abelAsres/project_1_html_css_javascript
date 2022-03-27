document.addEventListener("DOMContentLoaded", function(event) { 
    let titleSubtitle = document.querySelector('#user-subtitle');

    let userName = localStorage.getItem('userName');
    let userRole = localStorage.getItem('userRole');

    let role = userRole == 1 ? "Manager" : "Associate";
    
    titleSubtitle.innerHTML=userName + " | " + role;

    createCardComponent();
    
    createCardComponent();
    
    createCardComponent();
    
    createCardComponent();
    
    createCardComponent();
    
    createCardComponent();
  });

  function createElement(elementType,className,elementInnerHtml){
    let element = document.createElement(elementType);

    console.log(`elementInnerHTML: ${elementInnerHtml}`)
    if(elementInnerHtml){
      element.innerHTML= elementInnerHtml;
      
    }

    console.log(`className: ${className}`);
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

function createCardComponent(){
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
  let pSubtitle6 = createElement('p','subtitle');
  pSubtitle6.classList.add('is-6');
  //TODO 2: Add user email address
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