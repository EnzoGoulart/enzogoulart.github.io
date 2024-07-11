const btnCadastro = document.getElementById("btnCadastroCad");
const user = document.getElementsByClassName("inputUsuarioInd")[0];
const senha = document.getElementsByClassName("inputSenhaInd")[0];

async function criaBanco() {
    try {
        await alasql("CREATE DATABASE IF NOT EXISTS agrosys");
    } catch (e) {}
}

btnCadastro.addEventListener("click", async () => {
    if (user.value == "") {
        return alert("Usuário inválido.");
    }
    if (senha.value == "") {
        return alert("Senha inválida.");
    }
    try {
        let randomId = generateRandomCode(25);
        await criaBanco();
        await alasql(`CREATE TABLE IF NOT EXISTS agrosys.users(
                id varchar(50),
                user varchar(50),
                password varchar(180)        
                )`);

        if (
            (await alasql(
                `SELECT 1 FROM agrosys.users WHERE user = '${user.value}'`
            ).length) == 0
        ) {
            
            let antUsers = JSON.parse(localStorage.getItem("users")) || [];
            if(antUsers.find(e => e.user == user.value) != undefined) return alert("Já existe um usuário com esse nome!")
            await alasql(`INSERT INTO agrosys.users (id, user, password) 
                               VALUES ('${randomId}', '${
                user.value
            }', '${jab.encrypt(senha.value)}')`);
            

            localStorage.setItem(
                "users",
                JSON.stringify([
                    ...antUsers,
                    {id: randomId, user: user.value, password: jab.encrypt(senha.value) },
                ])
            );

            localStorage.setItem("id", randomId);

            window.location.href = "home.html";
        } else {
            return alert("Usuário já existe!");
        }
    } catch (e) {
        console.log("erro em cadastro.js:" + e);
    }
});
