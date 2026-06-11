const form = document.querySelector('#formLogin');
const mensagem = document.querySelector('.container');
const users = JSON.parse(localStorage.getItem("users") || []);
 


form.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailLogin = document.querySelector('#email').value;
    const senhaLogin = document.querySelector('#senha').value;

    const user = users.find(user => user.email === emailLogin); //dicar para ler Arrow Function de forma lógica: Para cada user => o email dele é igual ao digitado ?

    if (user && user.senha === senhaLogin) {

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(user)
        );

        mensagem.innerHTML = "<h2 style='color:green; text-align: center;'>Login bem sucedido!</h2>";
        setTimeout(() => {
            window.location.href = "pages/to-do.html";
        }, 2000); 

      

    } else {
        mensagem.innerHTML = "<h2 style='color:red; text-align: center;'>Usuário inválido</h2> <p style='color:red'>Registre-se!</p>";
        setTimeout(()=>{
            window.location.href = "/pages/register.html";
        },2000)
    }


});



