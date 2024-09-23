
const btn = document.getElementById('summary-button');
const dashboardBtn = document.getElementById('dashboard-button');
const loader = document.querySelector('.loader');
const keyButton = document.querySelector('#key-button')
const keyInput = document.getElementById('key-input')
const summaryButton = document.getElementById('summary-button')



let apiKey;
let aiResponseJSON;
let summarizedText = '';
const body = document.body;
let tabInfos;


function createItem(tag, className, attribute, content) {
    const newItem = document.createElement(tag)
    newItem.classList.add(className)
    if (attribute) {
        newItem[attribute] = content
    }
    return newItem
}


function checkArticle(document) {
    return document.getElementsByTagName('article').length > 0 ? true : false
}

// show loader and hide buttons
function showLoader() {
    loader.classList.add('active');
    btn.classList.add('hidden');          
    dashboardBtn.classList.add('hidden'); 
}

// hide loader and show buttons
function hideLoader() {
    loader.classList.remove('active');
    btn.classList.remove('hidden');          
    dashboardBtn.classList.remove('hidden'); 
}

function extractContents(document) {
    const articleContent = document.querySelectorAll('article')[0].textContent;
    return articleContent
}   



