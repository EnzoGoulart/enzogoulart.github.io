const btnLogin = document.getElementById("btnLoginInd");
const user = document.getElementsByClassName("inputUsuarioInd")[0];
const senha = document.getElementsByClassName("inputSenhaInd")[0];

async function criaBanco() {
    alasql("CREATE DATABASE IF NOT EXISTS agrosys");
}

btnLogin.addEventListener("click", async () => {
    if(user.value == "") {
        return alert("Usuário inválido.")
    }else if(senha.value == "") {
        return alert("Senha inválida.")
    }

    try {
        /*await criaBanco();
        await alasql(`CREATE TABLE IF NOT EXISTS agrosys.users(
                    id varchar(50),
                    user varchar(50),
                    password varchar(180)        
                    )`);

        const response = await alasql(`SELECT * FROM agrosys.users WHERE user = '${user.value}' AND password = '${jab.encrypt(senha.value)}'`)

        if(response.length == 1) {
            localStorage.setItem('id', response[0].id);
            window.location.href = "home.html"
        }*/

        const users = JSON.parse(localStorage.getItem('users'))
        const tent = users.find(e => jab.decrypt(e.password) == senha.value)
        if(tent != undefined) {
            localStorage.setItem("id", tent.id);
            return window.location.href = "home.html"
        } else {
            alert("Usuário ou senha incorretos!")
            return window.location.href = "index.html"
        }
    } catch (e) {
        console.log("Erro e mindex.js: " + e)
    }
});
