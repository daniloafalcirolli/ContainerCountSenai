function init(){
    org();
    addEvent();
}

function addEvent(){
    document.querySelector('#orange').addEventListener('click',()=>{orange();})
    document.querySelector('#purple').addEventListener('click',()=>{purple();})
    document.querySelector("#organizador").addEventListener("change", ()=>{
        let item = window.location.href.split("?");
        window.location.href = item[0]+"?org="+document.querySelector("#organizador").value;
    })
    document.querySelector("#procurar").addEventListener("keyup",()=>{
        selecionar(document.querySelector('#type').classList);
    })
}

function purple(){
    document.querySelector('#type').classList.remove('orange');
    document.querySelector('#type').classList.add('purple');
    document.querySelector("#procurar").type = 'text'
}
function orange(){
    document.querySelector('#type').classList.remove('purple');
    document.querySelector('#type').classList.add('orange');
    document.querySelector("#procurar").type = 'number'
}

function selecionar(element) {
    if(document.querySelector('#type').classList.contains('orange')){
        buscar(0)
    }else{
        buscar(1)
    }
}
function buscar(n){
    let tr = document.querySelectorAll('tr')
    tr.forEach((e,index) => {
        if(index>1){
            e.style = 'display:table-row'
        }
    })

    tr.forEach((e,index)=>{
        if(index>1){
            if(!e.querySelectorAll('td')[n].innerHTML.toLocaleLowerCase().includes(document.querySelector("#procurar").value.toLocaleLowerCase())){
                e.style = 'display:none'
            }
        }
    })
    
}

async function org(){
    var resp;
    async function connect(){
        var item = await fetch("https://gerenciamento-estoque-senai.herokuapp.com/itens");
        resp = await item.json();
        return resp;
    }
    await connect();
    let organizador = document.querySelector('#organizador');
    var params = new URLSearchParams(window.location.search);
    if(params.get("org")=="ni"){
        organizador.value = params.get("org");
        let item = resp.sort((x,y)=>{
            return x.codigoNI - y.codigoNI;
        })
        listartodos(item);
    }else if(params.get("org")=="status"){
        organizador.value = params.get("org");
        let json = {
            verify:[],
            not:[]
        }
        resp.forEach((e)=>{
            if(e.status.includes("nao")){
                json.verify.push(e);
            }else{
                json.not.push(e);
            }
        })
        let array = json.verify.concat(json.not);
        listartodos(array);
    }else{
        organizador.value = "";
        listartodos(resp);
    }
}

function listartodos(items){
    var infos = document.querySelector('#informacoes');
    for(let a = 0; a != items.length; a++){
        const model = document.querySelector('.model').cloneNode(true);
        model.querySelector('#ni').innerHTML = items[a].codigoNI;
        model.querySelector('#descricao').innerHTML = items[a].nome;
        model.querySelector('#status').innerHTML = items[a].status;
        model.querySelector('a').href = `../item/index.html?id=${items[a].id}`;
        model.classList.remove('model')
        if(a%2 == 1){
            model.classList.toggle('gray');
        }
        infos.appendChild(model);
    }
}

(init)()