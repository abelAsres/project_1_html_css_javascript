const url = "http://localhost:8080/"

let userName = localStorage.getItem('userName');
let userRole = localStorage.getItem('userRole');
let userId = localStorage.getItem('userId');
let role = userRole == 1 ? "Manager" : "Associate";
let fetchedReimbursements = [];
let filteredResults = [];

document.addEventListener("DOMContentLoaded", function(event) {     
    
    if(role === "Manager"){
        getAllReimbursements();
    }else{
        getUserReimbursements();
    }
});



function getAllReimbursements(){
    let urlUserReimbursements = `${url}project-1/reimbursements`;


    fetch(urlUserReimbursements, {
        method: 'GET'
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


fetch(urlUserReimbursements, {
        method: 'GET'
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
    tdResolved.appendChild(document.createTextNode(reimbursement.resolvedTime));
    let tdDescription = document.createElement('td');
    tdDescription.appendChild(document.createTextNode(reimbursement.description));
    let imageLink = document.createElement('a');
    imageLink.setAttribute('href',reimbursement.imageLink);
    imageLink.setAttribute('target','_blank')
    imageLink.appendChild(document.createTextNode(reimbursement.imageLink))
    let tdReceipt = document.createElement('td');
    tdReceipt.appendChild(imageLink);    
    let tdStatus = document.createElement('td');
    tdStatus.appendChild(document.createTextNode(reimbursement.status));
    let tdResolver = document.createElement('td');
    tdResolver.appendChild(document.createTextNode(reimbursement.resolver));

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
    fetchedReimbursements.sort(function(a, b) {
        let keyA =a.amount;
        let keyB= b.amount;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
    
    document.querySelector('tbody').innerHTML="";
    for (let reimbursement of fetchedReimbursements){
        addTableRow(reimbursement);
    }
}

function sortByType(){
    fetchedReimbursements.sort(function(a, b) {
        let keyA =a.type;
        let keyB= b.type;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
    
    document.querySelector('tbody').innerHTML="";
    for (let reimbursement of fetchedReimbursements){
        addTableRow(reimbursement);
    }
}

function sortByStatus(){
    fetchedReimbursements.sort(function(a, b) {
        let keyA =a.status;
        let keyB= b.status;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
    
    document.querySelector('tbody').innerHTML="";
    for (let reimbursement of fetchedReimbursements){
        addTableRow(reimbursement);
    }
}
function sortBySubmitted(){
    fetchedReimbursements.sort(function(a, b) {
        let keyA =a.submittedTime;
        let keyB= b.submittedTime;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
    
    document.querySelector('tbody').innerHTML="";
    for (let reimbursement of fetchedReimbursements){
        addTableRow(reimbursement);
    }
}

function filterByType(type){
    console.log('filtering  by type');
    if(filteredResults.length == 0){
        var results = fetchedReimbursements.filter(function(a) {
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
    for (let reimbursement of filteredResults){
        addTableRow(reimbursement);
    }
}

function filterByStatus(status){
    if(filteredResults.length == 0){
        var results = fetchedReimbursements.filter(function(a) {
            return a.status == status.value;
        });
        
        
    }else{
        filteredResults = filteredResults.filter(function(a) {
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
    for (let reimbursement of filteredResults){
        addTableRow(reimbursement);
    }
}

function filterByAssociate(associate){
    if(filteredResults.length == 0){
        var results = fetchedReimbursements.filter(function(a) {
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
    for (let reimbursement of filteredResults){
        addTableRow(reimbursement);
    }

    let dropDown= document.querySelector('#associate');
    dropDown.selectedIndex = 0;
}

function filterByManager(manager){
    if(filteredResults.length == 0){
        var results = fetchedReimbursements.filter(function(a) {
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
    for (let reimbursement of filteredResults){
        addTableRow(reimbursement);
    }
}

function clearFilters(){
    document.querySelector('tbody').innerHTML="";
    filteredResults = [];
    for (let reimbursement of fetchedReimbursements){
        addTableRow(reimbursement);
    }

    let associateDropDown= document.querySelector('#associate');
    associateDropDown.selectedIndex = 0;

    let typeDropDown= document.querySelector('#type');
    typeDropDown.selectedIndex = 0;

    let statusDropDown= document.querySelector('#status');
    statusDropDown.selectedIndex = 0;

    let managerDropDown= document.querySelector('#manager');
    managerDropDown.selectedIndex = 0;

}
