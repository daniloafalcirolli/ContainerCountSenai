(init)()

function init(){
    addEvent();
}

function addEvent(){
    document.querySelector('#inicio').onclick = ()=>{window.location.href = '../inventario/index.html';}
    document.querySelector('#salvar').onclick = ()=>{salvar();}
    document.querySelector("#fechar").onclick = ()=>{document.querySelector(".erro").style = 'display:none';}
}

function salvar(){
    async function post(info){
        let item = await fetch(`https://gerenciamento-estoque-senai.herokuapp.com/itens`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body":JSON.stringify(info)
        })
    }
    
    if(document.querySelector('#nome').value == ''){
        document.querySelector(".erro").style = 'display:flex';
    }else{
        let json = {
            codigoNI:"" || document.querySelector('#ni').value,
            nome: document.querySelector('#nome').value,
            status: "" || document.querySelector('#status').value,
            local: "" || document.querySelector('#oe').value,
            observacoes: "" || document.querySelector('#obs').value
        };
        post(json)
        let array = ["ni", "nome", "status", "oe", "obs"];
        array.forEach((e)=>{document.querySelector(`#${e}`).value = '';})
        window.location.href = "../inventario/index.html"
    }
}