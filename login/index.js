(init)();

function init(){
    addEvent();
}

function addEvent(){
    document.querySelector('#login').onclick = ()=>{logar();};
}

function logar(){
    let json = {
        cpf: document.querySelector('#cpf').value,
        senha: md5(document.querySelector('#password').value)
    }
    log(json).then(resp => {
        localStorage.setItem('user', JSON.stringify(resp));
        window.location.href = './inventario/index.html'
    })
}

async function log(json) {
    let item = await fetch('https://gerenciamento-estoque-senai.herokuapp.com/login', {
        "method": "POST",
        "headers":{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(json)
    })
    let ret = await item.json()
    if(item.status == 401){
        document.querySelector('.logerr').style = 'display:flex';
        setTimeout(()=>{
            document.querySelector('.logerr').style = 'display:none';
        }, 3000)
    }else{
        return ret;
    }
}