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

    const tarefa = inputTarefa.value;

    if (!tarefa || !dataTarefa || !horaTarefa || !categoriaTarefa) {

        mensagemErro.textContent = "Por favor, preencha todos os campos!";

        return;
    }

    tarefa ={
        
        Textotarefa : inputTarefa.value,
        categoria : inputCategoria.value,
        hora : inputHora.value,
        data : inputData.value, 
    }

    mensagemErro.textContent = "";


    console.log(tarefa);

    console.log(dataTarefa);

    console.log(horaTarefa);

    console.log(categoriaTarefa);


});