const divInfo = document.getElementById("divInfosInfo")

addEventListener("load", async()=>{
    const idCli = localStorage.getItem("cliente")
    const idUser = localStorage.getItem("id")
    let users = JSON.parse(localStorage.getItem("users")) 
    let nome = users.find(e => e.id == idUser).user 

    let enderecos = JSON.parse(localStorage.getItem("enderecos"))
    enderecos = enderecos.filter(e => e.cliente == idCli) 
    if(enderecos) {
        let semPri = enderecos.filter(e => e.principal != 1)
        let comPri = enderecos.filter(e => e.principal == 1) 
        if(comPri.length != 0) {
            divInfo.innerHTML += `
            <div id="divInfoInfo"> 
                <p><b>Endereço principal</b></p>
                <p><b>CEP:</b> ${comPri[0]?.cep}</p>
                <p><b>Rua:</b> ${comPri[0]?.rua}</p>
                <p><b>Bairro:</b> ${comPri[0]?.bairro}</p>
                <p><b>Cidade:</b> ${comPri[0]?.cidade}</p>
                <p><b>Estado:</b> ${comPri[0]?.estado}</p>
                <p><b>País:</b> ${comPri[0]?.pais}</p>
                <p><b>Cliente:</b> ${nome}</p>
            </div> 
            `
    
            semPri.forEach(e => {
                divInfo.innerHTML += `
            <div id="divInfoInfo">  
                <p><b>CEP:</b> ${e?.cep}</p>
                <p><b>Rua:</b> ${e?.rua}</p>
                <p><b>Bairro:</b> ${e?.bairro}</p>
                <p><b>Cidade:</b> ${e?.cidade}</p>
                <p><b>Estado:</b> ${e?.estado}</p>
                <p><b>País:</b> ${e?.pais}</p>
                <p><b>Cliente:</b> ${nome}</p>
            </div> 
            `
            });
        } else {
            divInfo.innerHTML += `<p class="title">Sem endereços cadastrados!</p>`
        }
    } else {
        divInfo.innerHTML += `<p class="title">Sem endereços cadastrados!</p>`
    }
    
})