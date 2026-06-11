
const form = document.querySelector('#formulario-tarefa');

const usuarioLogado = JSON.parse(
    localStorage.getItem("usuarioLogado")
);
 

//validação de login
if(!usuarioLogado){
    window.location.href = "../index.html"
}

document.querySelector('#nicknameLogin').textContent = usuarioLogado.nickname;
document.querySelector('#nicknameOla').textContent = usuarioLogado.nickname;

const inputTarefa = document.querySelector('#inputTarefa');
const inputData = document.querySelector('#inputData');
const inputHora = document.querySelector('#inputHora');
const inputCategoria = document.querySelector('#inputCategoria');

const mensagemErro = document.querySelector('#mensagemErro');
const listaTarefas = document.querySelector('#listaTarefas');

const todasTarefas = JSON.parse(localStorage.getItem("tarefas")) || {};
const emailUsuario = usuarioLogado.email;

todasTarefas[emailUsuario] = todasTarefas[emailUsuario] || []
const tarefas = todasTarefas[emailUsuario];

const contador = document.querySelector("#contadorTarefas");
const contadorTrabalho = document.querySelector("#contadorTrabalho");
const contadorEstudos = document.querySelector("#contadorEstudos");
const contadorPessoal = document.querySelector("#contadorPessoal");
const contadorSaude = document.querySelector("#contadorSaude");


//
form.addEventListener("submit", function (event) {

    event.preventDefault();

    // valores digitados pelo usuário
    const valorTextoTarefa = inputTarefa.value;
    const valorDataTarefa = inputData.value;
    const valorHoraTarefa = inputHora.value;
    const valorCategoriaTarefa = inputCategoria.value;

    // validação
    if (!valorTextoTarefa || !valorDataTarefa || !valorHoraTarefa || !valorCategoriaTarefa) {
        mensagemErro.textContent = "Por favor, preencha todos os campos!";
        return;
    }

    // objeto da tarefa
    const tarefa = {
        id: Date.now(), // gera um ID único com base no timestamp
        textoTarefa: valorTextoTarefa,
        categoria: valorCategoriaTarefa,
        hora: valorHoraTarefa,
        data: valorDataTarefa,
        propietario: usuarioLogado.email
    };
    
    
    // adiciona tarefa no array
    tarefas.push(tarefa);

    contadorTarefas(); //atualiza o contador de tarefas
    contadorCategorias(); //atualiza o contador de categorias

    criarTarefas(tarefa);

    salvarTarefas();

    // limpa mensagem de erro
    mensagemErro.textContent = "";

    // limpa os inputs
    inputTarefa.value = "";
    inputData.value = "";
    inputHora.value = "";
    inputCategoria.value = "";
});

// CRIAÇÃO DOS ELEMENTOS

function criarTarefas(tarefa){

    // card principal da tarefa
    const itemTarefa = document.createElement('div');
    itemTarefa.classList.add('item-tarefa');
    itemTarefa.dataset.id = tarefa.id; // adiciona o ID da tarefa como um atributo data-id no card, para facilitar a identificação posteriormente

    // status da tarefa
    const statusTarefa = document.createElement('div');
    statusTarefa.classList.add('status-tarefa');
    statusTarefa.classList.add('pendente');
    statusTarefa.textContent = "Pendente";

    // texto da tarefa
    const textoTarefa = document.createElement('p');
    textoTarefa.classList.add('texto-tarefa');
    textoTarefa.textContent = tarefa.textoTarefa;

    // categoria da tarefa
    const categoriaTarefa = document.createElement('span');
    categoriaTarefa.classList.add('categoria-tarefa');
    categoriaTarefa.textContent = tarefa.categoria;

    // data da tarefa
    const dataTarefa = document.createElement('p');
    const data = new Date(tarefa.data);

    dataTarefa.classList.add('data-tarefa');
    dataTarefa.textContent = data.toLocaleDateString('pt-BR'); // formata a data para o formato brasileiro

    // hora da tarefa
    const horaTarefa = document.createElement('p');
    horaTarefa.classList.add('hora-tarefa');
    horaTarefa.textContent = tarefa.hora;

    // botão da tarefa
    const botaoStatus = document.createElement('button');
    botaoStatus.classList.add('botao-status');
    botaoStatus.textContent = "Concluir";

    const botaoExcluir = document.createElement('button');
    botaoExcluir.classList.add('botao-remover');
    botaoExcluir.textContent = "Excluir";

    const botaoEditar = document.createElement('button');
    botaoEditar.classList.add('botao-editar');
    botaoEditar.textContent = "Editar";

    // MONTAGEM DA ESTRUTURA
    itemTarefa.appendChild(statusTarefa);
    itemTarefa.appendChild(textoTarefa);
    itemTarefa.appendChild(categoriaTarefa);
    itemTarefa.appendChild(dataTarefa);
    itemTarefa.appendChild(horaTarefa);
    itemTarefa.appendChild(botaoStatus);
    itemTarefa.appendChild(botaoEditar);
    itemTarefa.appendChild(botaoExcluir);

    // adiciona o card na tela
    listaTarefas.appendChild(itemTarefa);

    console.log(tarefas);
}

function botaoConcluir(){

   listaTarefas.addEventListener("click", function(event) {

    if (event.target.classList.contains("botao-status")) {

        const tarefa = event.target.closest(".item-tarefa");
        const status = tarefa.querySelector(".status-tarefa");

        if (status.classList.contains("pendente")) {

            status.textContent = "Concluída"; //muda status para concluída
            status.classList.remove("pendente"); //remove classe pendente
            status.classList.add("concluida"); //adciona classe concluida (CSS)

            event.target.textContent = "Marcar como Pendente";

        } else {

            status.textContent = "Pendente";
            status.classList.remove("concluida");
            status.classList.add("pendente");

            event.target.textContent = "Concluir"; // aplicar o target sempre que mudar um elemento individual
        }
    }
   });
}
botaoConcluir();

function botaoEditar(){

    listaTarefas.addEventListener("click", function(event) {

        const tarefa = event.target.closest(".item-tarefa"); //seleciona apenas o card da tarefa que foi clicada

        if (!tarefa) return;

        if(event.target.classList.contains("botao-editar")){ // verifico se o botão clicado é o editar

            const textoTarefaEditar = tarefa.querySelector(".texto-tarefa"); //seleciona o texto da tarefa dentro do card

            const input = document.createElement("input"); //cria um input
            input.classList.add("input-editar"); //adiciona uma classe para o input (CSS)
            input.value = textoTarefaEditar.textContent; //coloca o valor do texto da tarefa no input

            textoTarefaEditar.replaceWith(input); //substitui o texto da tarefa pelo input

            event.target.textContent = "Salvar"; //muda o texto do botão para salvar
            event.target.classList.remove("botao-editar"); //remove a classe do botão editar
            event.target.classList.add("botao-salvar"); //adiciona a classe do botão salvar

        }else if(event.target.classList.contains("botao-salvar")){

            const input = tarefa.querySelector(".input-editar"); //seleciona o input dentro do card

            if (!input.value.trim()) {

                input.value = "";
                input.placeholder = "Por favor, digite algo para editar!";
                input.focus();
                return;
            }

            const p = document.createElement("p"); //cria um elemento p
            p.classList.add("texto-tarefa"); //adiciona a classe do texto da tarefa
            p.textContent = input.value.trim(); //coloca o valor do input no texto da tarefa, e remove os espaços em branco

            input.replaceWith(p); //substitui o input pelo texto da tarefa

            event.target.textContent = "Editar"; //muda o texto do botão para editar
            event.target.classList.remove("botao-salvar"); //remove a classe do botão salvar
            event.target.classList.add("botao-editar"); //adiciona a classe do botão editar

            //atualização do objeto:

            const card = event.target.closest(".item-tarefa");
            const id = Number(card.dataset.id);

            const tarefaEncontrada = tarefas.find(
                tarefa => tarefa.id === id
            );

            if (tarefaEncontrada) {
                tarefaEncontrada.textoTarefa = input.value.trim();
                salvarTarefas();
            }
        }
    });
}
botaoEditar();

function botaoExcluir(){

    listaTarefas.addEventListener("click", function(event){

        if(event.target.classList.contains("botao-remover")){

            const card = event.target.closest(".item-tarefa"); //seleciona apenas o card da tarefa que foi clicada
            const confirmacao = confirm("Tem certeza que deseja excluir esta tarefa?"); //pergunta de confirmação
            const id = Number(card.dataset.id); //pega o ID da tarefa a partir do atributo data-id do card

            if(confirmacao){

                const indice = tarefas.findIndex(
                    tarefa => tarefa.id === id
                );

                if(indice !== -1){

                    tarefas.splice(indice, 1); //remove a tarefa do array

                    salvarTarefas();

                    contadorTarefas(); //atualiza o contador de tarefas
                    contadorCategorias(); //atualiza o contador de categorias
                }

                card.remove();

            } else{
                return;
            }
        }
    });
}
botaoExcluir();

function contadorTarefas(){

    contador.textContent = tarefas.length; //atualiza o contador com a quantidade de tarefas no array
}

function contadorCategorias(){

    contadorTrabalho.textContent = tarefas.filter(tarefa =>{
        return tarefa.categoria === 'Trabalho';
    }).length;

    contadorEstudos.textContent = tarefas.filter(tarefa =>{
        return tarefa.categoria === 'Estudos';
    }).length;

    contadorPessoal.textContent = tarefas.filter(tarefa =>{
        return tarefa.categoria === 'Pessoal';
    }).length;

    contadorSaude.textContent = tarefas.filter(tarefa =>{
        return tarefa.categoria === 'Saúde';
    }).length;
}

function salvarTarefas(){

    const todasTarefas = JSON.parse(localStorage.getItem("tarefas")) || {};

    todasTarefas[usuarioLogado.email] = tarefas;

    localStorage.setItem(
        "tarefas",
        JSON.stringify(todasTarefas)
    );
}

function renderizarTarefas(){

    listaTarefas.innerHTML = "";
    tarefas.forEach(tarefa => {
        criarTarefas(tarefa);
    });
}

botaoDeslogar = document.querySelector('#botaoDeslogar');

botaoDeslogar.addEventListener("click", function(event){
const containerMensagemLogado = document.querySelector('#usuarioLogado');
containerMensagemLogado.textContent = "Saindo..."

botaoDeslogar.style.display = "none";
    setTimeout(() => {
            window.location.href = "../index.html";
        }, 3000); 
})


renderizarTarefas();
contadorTarefas();
contadorCategorias();
