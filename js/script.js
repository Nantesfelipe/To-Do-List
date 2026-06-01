const form = document.querySelector('#formulario-tarefa');
const usuario = JSON.parse(localStorage.getItem("users")) || [];
const inputTarefa = document.querySelector('#inputTarefa');
const inputData = document.querySelector('#inputData');
const inputHora = document.querySelector('#inputHora');
const inputCategoria = document.querySelector('#inputCategoria');
const mensagemErro = document.querySelector('#mensagemErro');
const listaTarefas = document.querySelector('#listaTarefas');
const tarefas = [];



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
        textoTarefa: valorTextoTarefa,
        categoria: valorCategoriaTarefa,
        hora: valorHoraTarefa,
        data: valorDataTarefa,
    };


    // adiciona tarefa no array
    tarefas.push(tarefa);

    // CRIAÇÃO DOS ELEMENTOS
    
    // card principal da tarefa
    const itemTarefa = document.createElement('div');
    itemTarefa.classList.add('item-tarefa');

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
    dataTarefa.classList.add('data-tarefa');
    dataTarefa.textContent = tarefa.data;

    // hora da tarefa
    const horaTarefa = document.createElement('p');
    horaTarefa.classList.add('hora-tarefa');
    horaTarefa.textContent = tarefa.hora;

    // botão da tarefa
    const botaoStatus = document.createElement('button');
    botaoStatus.classList.add('botao-status');
    botaoStatus.textContent = "Concluir";
    
    // MONTAGEM DA ESTRUTURA
    itemTarefa.appendChild(statusTarefa);
    itemTarefa.appendChild(textoTarefa);
    itemTarefa.appendChild(categoriaTarefa);
    itemTarefa.appendChild(dataTarefa);
    itemTarefa.appendChild(horaTarefa);
    itemTarefa.appendChild(botaoStatus);

    // adiciona o card na tela
    listaTarefas.appendChild(itemTarefa);

    // limpa mensagem de erro
    mensagemErro.textContent = "";


    // limpa os inputs
    inputTarefa.value = "";
    inputData.value = "";
    inputHora.value = "";
    inputCategoria.value = "";

    console.log(tarefas);

});  