const form = document.querySelector('#formulario-tarefa');

const usuario = JSON.parse(localStorage.getItem("users")) || [];

const inputTarefa = document.querySelector('#inputTarefa');

const inputData = document.querySelector('#inputData');

const inputHora = document.querySelector('#inputHora');

const inputCategoria = document.querySelector('#inputCategoria');

const mensagemErro = document.querySelector('#mensagemErro');




form.addEventListener("submit", function (event) {

    event.preventDefault();

    const dataTarefa = inputData.value;

    const horaTarefa = inputHora.value;

    const categoriaTarefa = inputCategoria.value;

    const textoTarefa = inputTarefa.value;

    if (!textoTarefa || !dataTarefa || !horaTarefa || !categoriaTarefa) {

        mensagemErro.textContent = "Por favor, preencha todos os campos!";

        return;
    }

    const tarefa = {

        textoTarefa: textoTarefa,

        categoria: categoriaTarefa,

        hora: horaTarefa,

        data: dataTarefa,

    }
    mensagemErro.textContent = "";


    console.log(tarefa);

    console.log(dataTarefa);

    console.log(horaTarefa);

    console.log(categoriaTarefa);


});

const tarefas = [
    tarefas.push(tarefa)
];

const itemTarefa = document.createElement('div');
const informacoesTarefa = document.createElement('div'); //div container n precisa de textContent
const statusTarefa = document.createElement('div');

itemTarefa.classList.add('item-tarefa');
informacoesTarefa.classList.add('informacoes-tarefa');
statusTarefa.classList.add('status-tarefa');

statusTarefa.textContent = "Pendente";

const div = document.createElement('div');
const textoTarefa = document.createElement('p');
const categoriaTarefa = document.createElement('span');

textoTarefa.classList.add('texto-tarefa');
categoriaTarefa.classList.add('categoria-tarefa');  

textoTarefa.textContent = tarefa.textoTarefa;
categoriaTarefa.textContent = tarefa.categoria;

// elementos adcionados as seguintes variaveis:
//itemTarefa, informacoesTarefa, statusTarefa, textoTarefa, categoriaTarefa
//proximo passo: adicionar os elementos a pagina, usando appendChild ou append