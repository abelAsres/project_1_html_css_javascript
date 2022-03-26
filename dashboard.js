document.addEventListener("DOMContentLoaded", function(event) { 
    let titleH1 = document.querySelector('#dashboard-title');

    let userName = localStorage.getItem('userName');
    let userRole = localStorage.getItem('userRole');
    
    titleH1.innerHTML= userName+ "'s Dashboard"
    var doc = new DOMParser().parseFromString(tHead, "text/html");

    //document.getElementsByClassName('table')[0].appendChild(doc);

    let table = document.querySelector('#table');
    let tHead;
    if(userRole === 1){
      let tHeadInnerHtml ="<tr> <th>Id</th> <th>User Name</th> <th>User Role</th> <th>Receipt</th> <th>Amount</th> </tr>"
      tHead = createElement('tHead',tHeadInnerHtml);
    }else{

    }
    

    
    table.appendChild(tHead);
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

  function createCardComponent(){
    let divCard = createElement('div','card');
    let divCardImg = createElement('div','card-image');
    let figureImage1 = createElement('figure','image is-4by3');
    let img1 = document.createElement('img');
    img1.setAttribute('src','https://bulma.io/images/placeholders/1280x960.png');
    let divCardContent = createElement('div' ,'card-content');
    let divMedia = createElement.apply('div','media');
    let divMediaLeft = createElement.apply('div','media-left');
    let figureImage2 = createElement('figure','image is-48x48');
    let img2 = document.createElement('img');
    img2.setAttribute('src','https://bulma.io/images/placeholders/96x96.png');
    
  }


  <div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">John Smith</p>
        <p class="subtitle is-6">@johnsmith</p>
      </div>
    </div>

    <div class="content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Phasellus nec iaculis mauris. <a>@bulmaio</a>.
      <a href="#">#css</a> <a href="#">#responsive</a>
      <br>
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>
</div>