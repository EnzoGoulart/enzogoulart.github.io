const divDados = document.getElementById("divDadosHome");
 
addEventListener("load", async () => {  
    let response = JSON.parse(localStorage.getItem("clientes")) || []; 
    response = response.filter(e => e.user == localStorage.getItem('id'))
    response.forEach(e => {
        divDados.innerHTML += ` <div id="headerDadoHome">
                                    <p id="nomeDadoHome">${e.nome}</p> 
                                    <p id="infoDadoHome" onclick="irInfos('${e.id}')">Ver</p>
                                    <p id="endeDadoHome" onclick="irEnderecos('${e.id}')">Ver</p>
                                </div>
                                `
    });
}) 
 
function irInfos(id) {
    localStorage.setItem('cliente', id)
    window.location.href = "infos.html";
}
function irEnderecos(id) {
    localStorage.setItem('cliente', id)
    window.location.href = "enderecos.html";
}