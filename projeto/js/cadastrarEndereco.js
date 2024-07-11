const endPri = document.getElementById("endPriCadCli");
const cep = document.getElementById("cepCadCli");
const rua = document.getElementById("ruaCadCli");
const bairro = document.getElementById("bairroCadCli");
const cidade = document.getElementById("cidadeCadCli");
const estado = document.getElementById("estadoCadCli");
const pais = document.getElementById("paisCadCli");
const cliente = document.getElementById("clienteCadCli");
const btnCadastrar = document.getElementById("btnCadCadCli");
const chkConCad = document.getElementById("contCadCadCli");


 
addEventListener("load", () => {
    const idCli = localStorage.getItem("cliente");
    const clientes = JSON.parse(localStorage.getItem("clientes"));
    const clienteFiltrado = clientes.find((e) => e?.id == idCli);
    if (clienteFiltrado) {
        cliente.value = clienteFiltrado.nome;
    }
});
 
btnCadastrar.addEventListener("click", async () => {
    try {
        const idCli = localStorage.getItem("cliente"); 
        let enderecos = JSON.parse(localStorage.getItem("enderecos")) || [];
   
        let temPrincipal = enderecos.some((e) => e?.cliente == idCli && e?.principal == 1);
    
        let principal = 1;
        if (endPri.checked || !temPrincipal) {
            principal = 1;
        } else {
            principal = 0;
        }
 
        await criaBanco(); 
        await alasql(`CREATE TABLE IF NOT EXISTS agrosys.enderecos(
            id varchar(25),
            principal int,
            cep varchar(9),
            rua varchar(50),
            bairro varchar(50),
            cidade varchar(50),
            estado varchar(50),
            pais varchar(50),
            cliente varchar(50)
        )`);
 
        if (endPri.checked && enderecos.length != 0) {
            enderecos.forEach((e) => {
                if (e.cliente == idCli) {
                    e.principal = 0;
                }
            });
        }
 
        const newId = generateRandomCode(25);
 
        await alasql(`INSERT INTO agrosys.enderecos (id, cep, principal, rua, bairro, cidade, estado, pais, cliente)
            VALUES ('${newId}', '${cep.value}', '${principal}', '${rua.value}', '${bairro.value}', '${cidade.value}', '${estado.value}', '${pais.value}', '${idCli}')`);
 
        const response = await alasql(
            `SELECT * FROM agrosys.enderecos WHERE id = '${newId}'`
        ); 
        enderecos.push(response[0]);  

        localStorage.setItem("enderecos", JSON.stringify(enderecos));  

        if(chkConCad.checked) { 
            window.location.href = "cadastrarEndereco.html";
        } else {
            window.location.href = "enderecos.html";
        }
    } catch (e) {
        console.log("Erro em cadastrarEndereco.js: " + e);
    }
});

 
async function criaBanco() {
    try {
        await alasql("CREATE DATABASE IF NOT EXISTS agrosys");
    } catch (e) {
        console.log("Erro ao criar banco: " + e);
    }
}
