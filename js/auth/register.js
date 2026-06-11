const form = document.querySelector('#formRegister');

//1. Capturar submit do form 
form.addEventListener("submit", function (event) {

    //2. Impedir reload 
    event.preventDefault();

    //3. Pegar email e senha 
    const emailRegister = document.querySelector('#emailRegister').value;
    const passwordRegister = document.querySelector('#passwordRegister').value;
    const nickname = document.querySelector('#nickname').value;

    const erro = document.getElementById('mensagemDeErro');
    const sucesso = document.getElementById('mensagemDeSucesso');

    //Mensagens de erro
    if (!emailRegister.trim() || !passwordRegister.trim()) {
        erro.textContent = "Preencha todos os campos!"
        return;
    };

    if (passwordRegister.trim().length <= 10) {
        erro.textContent = "A senha precisa ter no mínimo 10 digitos!"
        return;
    };


    /*4. Validar campos vazios 
    → Se vazio: mostrar mensagem de erro*/
    const users = JSON.parse(localStorage.getItem("users")) || [];//busca os dados e salva na chave users, se n exisitr nada salva no array [] / .parse transforma objeto em arra       
    const existeUsers = users.some(user => user.email === emailRegister);  // verifica se o email ja ta salvo usando arrow function, .some compara se ja existe o usuario (email)

    /*5. Verifica se o usuario existe, se não salva no localStorage*/
    if (existeUsers) {
        erro.textContent = "Usuário já existe!"
        setTimeout(() => {
            window.location.href = "/index.html";
        }, 3000);
        sucesso.innerHTML = ("<h2 style='color:green;'>Usuário ja cadastrado!</h2>");

    } else {
        users.push({
            nickname,
            email: emailRegister,
            senha: passwordRegister
            
        });

        sucesso.textContent = "Usuário cadastrado com sucesso!"
        setTimeout(() => {
            erro.innerHTML = ("<h2 style='color:green;'>Redirecionando para o Login</h2>");
        }, 1000);

        setTimeout(() => {
            window.location.href = "/index.html";
        }, 3000);
       

        
    localStorage.setItem("users", JSON.stringify(users));  //salva no localstorage e transforma o objeto em string
    }

});

