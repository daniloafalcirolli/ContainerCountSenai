(init)()

function init(){
    processLog();
    addEvent();
}

function processLog(){
    if(localStorage.getItem('user') == undefined){
        window.location.href = '../index.html';
    }
}

function addEvent(){
    document.querySelector('#adicionar').onclick = ()=>{window.location.href = '../adicionar/index.html';}
}