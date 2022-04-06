
//const url ="http://localhost:8080/";
const url = "http://35.239.233.30:8080/";

let userName = localStorage.getItem('userName');
let userRole = localStorage.getItem('userRole');
let userId = localStorage.getItem('userId');
let role = userRole == 1 ? "Manager" : "Associate";
let fetchedReimbursements = [];
let filteredResults = [];

let logoutBtn = document.querySelector('#logout-btn');

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('jwt');

    window.location = '../index.html';
});

document.addEventListener("DOMContentLoaded", function(event) {     
    
    if(role === "Manager"){
        let th1 = document.createElement('th');
        let th2 = document.createElement('th');

        th1.appendChild(document.createTextNode('Accept/Decline'));
        th2.appendChild(document.createTextNode('Accept/Decline'));

        let tr1 = document.querySelector('thead > tr');
        let tr2 = document.querySelector('tfoot > tr');

        tr1.appendChild(th1);
        tr2.appendChild(th2);
        getAllReimbursements();
    }else{
        getUserReimbursements();
    }
});


/* Fetch Request*/
function getAllReimbursements(){
    let urlUserReimbursements = `${url}project-1/reimbursements`;


    fetch(urlUserReimbursements, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}` // Include our JWT into the request
        }
    })
    .then(response =>{
        if(response.status === 200){
        response.json()
        .then(reimbursements =>{
            
            fetchedReimbursements = [];
            for(let reimbursement of reimbursements){
                fetchedReimbursements.push(reimbursement);
                addTableRow(reimbursement);  
            }
            for(let reimbursement of reimbursements){
                addAssociateToDropDown(reimbursement.author);
                addManagerToDropDown(reimbursement.resolver)  
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

console.log
fetch(urlUserReimbursements, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}` // Include our JWT into the request
        }
    })
    .then(response =>{
        if(response.status === 200){
        response.json()
        .then(reimbursements =>{
            
            fetchedReimbursements = [];
            for(let reimbursement of reimbursements){
                fetchedReimbursements.push(reimbursement);
                addTableRow(reimbursement);
                addAssociateToDropDown(reimbursement.author);
                addManagerToDropDown(reimbursement.resolver);
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

function updateReimbursementStatus(radio){
    let id = radio.id.split('-')[2];
    let status = radio.value;

    let urlEditReimbursements = `${url}project-1/reimbursements/${id}?status=${status}&user_id=${userId}`;

    console.log();

    fetch(urlEditReimbursements, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}` // Include our JWT into the request
            }
        })
        .then(response =>{
            if(response.status === 200){
            response.json()
            .then(reimbursements =>{
                
                fetchedReimbursements = [];
                document.querySelector('tbody').innerHTML="";
                for(let reimbursement of reimbursements){
                    fetchedReimbursements.push(reimbursement);
                    addTableRow(reimbursement);
                    addAssociateToDropDown(reimbursement.author);
                    addManagerToDropDown(reimbursement.resolver);
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

//resultSet on the backend casuing 400 error
function submitReimbursement(){
    let description = document.querySelector('#reimb-description').value; 
    let amount=document.querySelector('#reimb-amount').value;
    let imageData= document.querySelector('#reimb-image').files[0];
    let typeRadioButtons = document.querySelectorAll('.reimb-type-radio');
    let count = 1;
    let typeId=1;

    console.log(typeRadioButtons);
    for (let button of typeRadioButtons){
        console.log(button);
        if(button.checked){
            console.log('button is checked');
            typeId = count;
        }
        count++;
    }

    let reimbursement = new FormData();
    reimbursement.append("image",imageData);
    reimbursement.append("description",description);
    reimbursement.append("amount",amount);
    reimbursement.append("author",userId);
    reimbursement.append("type",typeId);

    const addReimbursementURL = url+ `project-1/users/${userId}/reimbursements`;

    fetch(addReimbursementURL, {
        method: 'POST', 
        body:reimbursement,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}` // Include our JWT into the request
        }
    })
    .then(response =>{
        if(response.status === 201){
        response.json()
        .then(addedReimbursement =>{
            fetchedReimbursements.push(addedReimbursement);
            console.log(fetchedReimbursements.indexOf(addedReimbursement));
            addTableRow(addedReimbursement);

            if(filteredResults.length > 0){
                filteredResults = [];
                clearFilters();
            }
        })
        .catch(errorMsg=>{
            console.log(`You ran into an error: ${errorMsg}`);
        })
    }})
    isActiveModal();
}


/* Functions to manage DOM*/
function addTableRow(reimbursement){
    let tr = document.createElement('tr');
    let tdAmount = document.createElement('td');
    tdAmount.appendChild(document.createTextNode(reimbursement.amount));
    let tdAssociate = document.createElement('td');
    tdAssociate.appendChild(document.createTextNode(reimbursement.author));
    let tdType = document.createElement('td');
    tdType.appendChild(document.createTextNode(reimbursement.type));
    let tdSubmitted = document.createElement('td');
    tdSubmitted.appendChild(document.createTextNode(reimbursement.submittedTime));
    let tdResolved = document.createElement('td');
    tdResolved.appendChild(document.createTextNode(isResolved(reimbursement.resolvedTime)));
    let tdDescription = document.createElement('td');
    tdDescription.appendChild(document.createTextNode(reimbursement.description));
    let imageLink = document.createElement('a');
    imageLink.setAttribute('href',reimbursement.imageLink);
    imageLink.setAttribute('target','_blank')
    imageLink.appendChild(document.createTextNode(reimbursement.imageLink));
    let tdReceipt = document.createElement('td');
    tdReceipt.appendChild(imageLink);    
    let tdStatus = document.createElement('td');
    tdStatus.appendChild(document.createTextNode(reimbursement.status));
    let tdResolver = document.createElement('td');
    tdResolver.appendChild(document.createTextNode(hasResolver(reimbursement.resolver)));
    
    let radio = document.createElement('div');
    radio.setAttribute('id',reimbursement.id);
    radio.classList.add('control');
    let labelAccept = document.createElement('label');
    labelAccept.classList.add('radio');
    let acceptInput = document.createElement('input');

    acceptInput.type = 'radio';
    acceptInput.id = `resolve-accept-${reimbursement.id}`;
    acceptInput.name= `resolve-${reimbursement.id}`;
    acceptInput.value = 'Accept';
    acceptInput.addEventListener('change',()=>{
        updateReimbursementStatus(acceptInput);
    })

    labelAccept.htmlFor = `resolve-accept-${reimbursement.id}`;

    labelAccept.appendChild(acceptInput);
    radio.appendChild(labelAccept);

    let labelDecline = document.createElement('label');
    labelDecline.classList.add('radio');
    let declineInput = document.createElement('input');

    declineInput.type = 'radio';
    declineInput.id = `resolve-decline-${reimbursement.id}`;
    declineInput.name= `resolve-${reimbursement.id}`;
    declineInput.value = 'Decline';
    declineInput.addEventListener('change',()=>{
        updateReimbursementStatus(declineInput);
    })
    
    if(reimbursement.status == 'Approved'){
        acceptInput.checked=true;
        acceptInput.disabled=true;
        declineInput.disabled=true;
    }
    if(reimbursement.status == 'Denied'){
        declineInput.checked=true;
        acceptInput.disabled=true;
        declineInput.disabled=true;
    }
    labelDecline.htmlFor = `resolve-decline-${reimbursement.id}`;

    labelDecline.appendChild(declineInput);
    radio.appendChild(labelDecline);

    let descriptionAccept = document.createTextNode('Accept');
    let descriptionDecline = document.createTextNode('Decline');
    
    labelAccept.appendChild(descriptionAccept);
    labelDecline.appendChild(descriptionDecline);
    let tBody = document.querySelector('tbody');
    
    
    tr.appendChild(tdAmount);
    tr.appendChild(tdAssociate);
    tr.appendChild(tdType);
    tr.appendChild(tdSubmitted);
    tr.appendChild(tdResolved);
    tr.appendChild(tdDescription);
    tr.appendChild(tdReceipt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdResolver);
    if(role === 'Manager'){
        tr.appendChild(radio);
    }
    tBody.appendChild(tr);
}

function addAssociateToDropDown(associate){
    let selectTag = document.querySelector('#associate');
    let options = selectTag.getElementsByTagName('option');
    let arr = Array.from(options);
    let optionValues = [];
    
    for (let value of arr){
        optionValues.push(value.innerHTML);
    }

    if (optionValues.indexOf(associate) === -1){    
        let selectTag = document.querySelector('#associate');
        let optionText = document.createTextNode(associate);
        let option = document.createElement('option');
        option.appendChild(optionText);
        option.value=associate;
        selectTag.appendChild(option);
    }
}

function addManagerToDropDown(manager){
    let selectTag = document.querySelector('#manager');
    let options = selectTag.getElementsByTagName('option');
    let arr = Array.from(options);
    let optionValues = [];
    
    for (let value of arr){
        optionValues.push(value.innerHTML);
    }
    
    if(manager != null){
        if (optionValues.indexOf(manager) === -1){
            let selectTag = document.querySelector('#manager');
            let optionText = document.createTextNode(manager);
            let option = document.createElement('option');
            option.appendChild(optionText);
            option.value=manager;
            selectTag.appendChild(option);
        }
    }
}

function sortByAmount(){
    if(filteredResults.length == 0){
        filteredResults = fetchedReimbursements;
    }
    filteredResults.sort(function(a, b) {
        let keyA =a.amount;
        let keyB= b.amount;
        
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
    
    document.querySelector('tbody').innerHTML="";
    buildReimbursementTable(filteredResults);
}

function sortByType(){
    if(filteredResults.length == 0){
        filteredResults = fetchedReimbursements;
    }
    filteredResults.sort(function(a, b) {
        let keyA =a.type;
        let keyB= b.type;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
    
    document.querySelector('tbody').innerHTML="";
    buildReimbursementTable(filteredResults);
}

function sortByStatus(){
    if(filteredResults.length == 0){
        filteredResults = fetchedReimbursements;
    }
    filteredResults.sort(function(a, b) {
        let keyA =a.status;
        let keyB= b.status;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
    
    document.querySelector('tbody').innerHTML="";
    buildReimbursementTable(filteredResults);
}
function sortBySubmitted(){
    if(filteredResults.length == 0){
        filteredResults = fetchedReimbursements;
    }
    filteredResults.sort(function(a, b) {
        let keyA =a.submittedTime;
        let keyB= b.submittedTime;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
    
    document.querySelector('tbody').innerHTML="";
    buildReimbursementTable(filteredResults);
}

function filterByType(type){
    let results = [];
    if(filteredResults.length == 0){
        results = fetchedReimbursements.filter(function(a) {
            return a.type == type.value;
        });
    }else{
        filteredResults = filteredResults.filter(function(a) {
            return a.type == type.value;
        });
        
        filteredResults = [];
    }
    
    for(let result of results){
        if(filteredResults.indexOf(result) === -1){
            filteredResults.push(result);
        }
    }
    
    
    document.querySelector('tbody').innerHTML="";
    buildReimbursementTable(filteredResults);
}

function filterByStatus(status){
    let results = [];
    if(filteredResults.length == 0){
        results = fetchedReimbursements.filter(function(a) {
            return a.status == status.value;
        });
        
        
    }else{
        results = filteredResults.filter(function(a) {
            return a.status == status.value;
        });
        
        filteredResults = [];
    }
    

    for(let result of results){
        if(filteredResults.indexOf(result) === -1){
            filteredResults.push(result);
        }
    }
    
    document.querySelector('tbody').innerHTML="";
    buildReimbursementTable(filteredResults);
}

function filterByAssociate(associate){
    let results = [];
    if(filteredResults.length == 0){
        results = fetchedReimbursements.filter(function(a) {
            return a.author == associate.value;
        });
    }else{
        results = filteredResults.filter(function(a) {
            return a.author == associate.value;
        });
        filteredResults = [];
    }
    


    for(let result of results){
        if(filteredResults.indexOf(result) === -1){
            filteredResults.push(result);
        }
    }
    
    document.querySelector('tbody').innerHTML="";
    
    buildReimbursementTable(filteredResults);

    let dropDown= document.querySelector('#associate');
    dropDown.selectedIndex = 0;
}

function filterByManager(manager){
    let results = [];
    if(filteredResults.length == 0){
        results = fetchedReimbursements.filter(function(a) {
            return a.resolver == manager.value;
        });
    }else{
        results = filteredResults.filter(function(a) {
            return a.resolver == manager.value;
        });
        
        filteredResults = [];
    }
    

    for(let result of results){
        if(filteredResults.indexOf(result) === -1){
            filteredResults.push(result);
        }
    }
    
    document.querySelector('tbody').innerHTML="";
    buildReimbursementTable(filteredResults);
}

function clearFilters(){
    document.querySelector('tbody').innerHTML="";
    filteredResults = [];

    buildReimbursementTable(fetchedReimbursements)

    let associateDropDown= document.querySelector('#associate');
    associateDropDown.selectedIndex = 0;

    let typeDropDown= document.querySelector('#type');
    typeDropDown.selectedIndex = 0;

    let statusDropDown= document.querySelector('#status');
    statusDropDown.selectedIndex = 0;

    let managerDropDown= document.querySelector('#manager');
    managerDropDown.selectedIndex = 0;
}

function isActiveModal(){
    let modal = document.querySelector('.modal');
    modal.classList.contains('is-active') ? modal.classList.remove('is-active') : modal.classList.add('is-active');
    //modal.classList.contains('is-active') ? addFileName : removeFileName;
}

function hasResolver(resolver){
    return resolver == null ? "Someone will be with you soon" : resolver;
}

function isResolved(time){
    return time == null ? "Waiting to be Resolved" : time;
}

function buildReimbursementTable(reimbursements){
    for (let reimbursement of reimbursements){
        addTableRow(reimbursement);
    }
}