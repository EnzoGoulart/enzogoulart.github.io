const btnCadastrar = document.getElementById("btnCadCadCli");
const nome = document.getElementById("nomeCadCli");
const cpf = document.getElementById("cpfCadCli");
const data = document.getElementById("dataCadCli");
const telefone = document.getElementById("telefoneCadCli");
const celular = document.getElementById("celularCadCli");
const check = document.getElementById("checkCadCli");

async function criaBanco() {
    try {
        await alasql("CREATE DATABASE IF NOT EXISTS agrosys");
    } catch (e) {}
}

btnCadastrar.addEventListener("click", async () => {
    if (nome.value == "") {
        return alert("Nome inválido!");
    } else if (cpf.value == "") {
        return alert("CPF inválido!");
    } else if (data.value == "") {
        return alert("Data de Nascimento inválida!");
    } else if (telefone.value == "") {
        return alert("Telefone inválido!");
    } else if (celular.value == "") {
        return alert("Celular inválido!");
    }

    try {
        await criaBanco();
        await alasql(`CREATE TABLE IF NOT EXISTS agrosys.clientes(
            id varchar(25),
            nome varchar(50),
            cpf varchar(14),
            dataNascimento varchar(10),
            telefone varchar(18),
            celular varchar(20),
            user varchar(50)
            )`);

        await alasql("USE agrosys");
        const antCli = JSON.parse(localStorage.getItem("clientes")) || []
        if (antCli.find(e=> e.cpf == cpf.value) == undefined) {
            const user = localStorage.getItem("id")
            await alasql(`INSERT INTO agrosys.clientes (id, nome, cpf, dataNascimento, telefone, celular, user)
                               VALUES ('${generateRandomCode(25)}', '${nome.value}', '${cpf.value}', '${data.value}', '${telefone.value}', '${celular.value}', '${user}')`);
                               
            
            const select = await alasql(`SELECT * FROM agrosys.clientes WHERE user = '${user}'`)
  
            localStorage.setItem("clientes", JSON.stringify([...antCli, ...select]))
            if (check.checked) {
                window.location.href = "cadastrarClientes.html";
            } else {
                window.location.href = "home.html";
            }
        } else {
            return alert("CPF já cadastrado!");
        }
    } catch (e) {
        console.log("erro em cadastrarclientes.js: " + e);
    }
});
