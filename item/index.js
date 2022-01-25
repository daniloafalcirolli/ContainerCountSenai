var params = new URLSearchParams(window.location.search);
function init(){
    mostrar(procurar());
    addEvent();
}

function procurar(){
    async function connect(){
        let item = await fetch(`https://gerenciamento-estoque-senai.herokuapp.com/itens/${params.get('id')}`);
        return await item.json();
    }
    return connect();
}

async function mostrar(item){
    let FinalItem = await item;
    document.querySelector('#ni').innerHTML = FinalItem.codigoNI;
    document.querySelector('#descricao').innerHTML = FinalItem.nome;
    document.querySelector('#status').innerHTML = FinalItem.status;
    document.querySelector('#sala').value = FinalItem.ondeEsta;
    document.querySelector('#obs').value = FinalItem.observacoes;
}

function addEvent(){
    document.querySelector('#apagar').addEventListener('click', function(){
        apagar();
        window.location.href = "../inventario/index.html";
    })
    document.querySelector('#verif').addEventListener('click', function(){
        let json = {
            observacoes:"" || document.querySelector('#obs').value,
            local:document.querySelector('#sala').value
        };
        verificar(json);
        window.location.href = "../inventario/index.html";
    })
}

async function apagar(){
    let item = await fetch(`https://gerenciamento-estoque-senai.herokuapp.com/itens/${params.get('id')}`, {
        "method": "DELETE",
        "headers": {}
    });
}
async function verificar(json){
    console.log(json)
    let item = await fetch(`https://gerenciamento-estoque-senai.herokuapp.com/itens/${params.get('id')}`, {
        "method": "PUT",
        "headers": {
            contentType: "application/json"
        },
        "body":JSON.stringify(json)
    });
}

(init)()