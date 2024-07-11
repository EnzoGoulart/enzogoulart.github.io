const btnExp = document.getElementById("btnExpDbConf");
const btnImp = document.getElementById("btnImpDbConf");
const fileInput = document.getElementById("fileInpConf");


btnExp.addEventListener("click", () => {
    const clientes = JSON.parse(localStorage.getItem("clientes"));
    const enderecos = JSON.parse(localStorage.getItem("enderecos"));
    const users = JSON.parse(localStorage.getItem("users"));

    const all = JSON.stringify({ clientes, enderecos, users });
 
    const blob = new Blob([all], { type: "application/json" });
 
    const url = URL.createObjectURL(blob);
 
    const a = document.createElement("a");
    a.href = url;
    a.download = "banco_de_dados.txt";  
    document.body.appendChild(a);
    a.click();
 
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}); 


fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const json = JSON.parse(e.target.result);
            localStorage.setItem("clientes", JSON.stringify(json.clientes));
            localStorage.setItem("enderecos", JSON.stringify(json.enderecos));
            localStorage.setItem("users", JSON.stringify(json.users));
            alert("Banco de dados importado com sucesso!");
            window.location.href = "index.html"
        } catch (error) {
            console.error("Erro ao importar o banco de dados:", error);
            alert("Erro ao importar o banco de dados.");
        }
    };

    reader.readAsText(file);
});