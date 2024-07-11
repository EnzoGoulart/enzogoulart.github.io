const btnCadastrar = document.getElementById("btnCadCadCli");
const nome = document.getElementById("nomeCadCli");
const cpf = document.getElementById("cpfCadCli");
const data = document.getElementById("dataCadCli");
const telefone = document.getElementById("telefoneCadCli");
const celular = document.getElementById("celularCadCli");
const btnAlt = document.getElementById("altInfInfos");
const btnDel = document.getElementById("delInfInfos");

const idCli = localStorage.getItem("cliente");
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

addEventListener("load", () => {
    try {
        let c = clientes.filter((e) => e.id == idCli)[0];

        nome.value = c.nome;
        cpf.value = c.cpf;
        data.value = c.dataNascimento;
        telefone.value = c.telefone;
        celular.value = c.celular;
    } catch (e) {
        console.log("erro em infos.js: " + e);
    }
});

btnAlt.addEventListener("click", () => {
    try {
        let c = clientes.find((e) => e.id == idCli); 
        if (c) {
            c.nome = nome.value != "" && nome.value;
            c.cpf = cpf.value != "" && cpf.value;
            c.dataNascimento = data.value != "" && data.value;
            c.telefone = telefone.value != "" && telefone.value;
            c.celular = celular.value != "" && celular.value;

            localStorage.setItem("clientes", JSON.stringify(clientes)); 
            window.location.href = "home.html";
        }

    } catch (e) {
        console.log("Erro ao alterar as informações: " + e);
    }
});

btnDel.addEventListener("click", () => {
    let enderecos = JSON.parse(localStorage.getItem("enderecos")) || [];
    let e = enderecos.filter((e) => e.cliente != idCli);
    localStorage.setItem("enderecos", JSON.stringify(e));

    let c = clientes.filter((e) => e.id != idCli);
    localStorage.setItem("clientes", JSON.stringify(c));
    localStorage.removeItem("cliente");

    window.location.href = "home.html";
});
