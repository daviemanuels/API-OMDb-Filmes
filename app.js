const nomeBusca = document.querySelector(".input");
const mensagemErro = document.querySelector("#mensagemErro");
const botaoBuscar = document.querySelector("#botao_buscar");
const titulo = document.querySelector("#titulo");
const sinopse = document.querySelector("#sinopse");
const ano = document.querySelector("#ano");
const duracao = document.querySelector("#duracao");
const genero = document.querySelector("#genero");
const atores = document.querySelector("#atores");
const diretor = document.querySelector("#diretor");
const poster = document.querySelector(".poster");

const apiKey = "a08948f";
const imgDefault = "./default_image.png";

async function buscaFilme(nomeBusca){
     const resposta = await fetch(`http://www.omdbapi.com/?t=${nomeBusca}&apikey=${apiKey}`);
     return resposta.json();
}

botaoBuscar.addEventListener("click", () => {
     limparCampos();
     core();
})

window.addEventListener("keypress", (e) => {
     if(e.key === "Enter") {
          limparCampos();
          core();
     }
})

async function core() {
     try {
          const filme = await buscaFilme(nomeBusca.value);
          validaDados(filme);
          defineValores(filme);
     }catch(erro) {
          console.log(erro);
          mensagemErro.textContent = `${erro}`
     }

}

function defineValores(filme) {
     titulo.textContent = `Título: ${filme.Title}`;
     sinopse.textContent = `Sinopse: ${filme.Plot}`;
     ano.textContent = `Ano: ${filme.Year}`;
     duracao.textContent = `Duração: ${filme.Runtime}`;
     genero.textContent = `Gênero: ${filme.Genre}`;
     atores.textContent = `Atores principais: ${filme.Actors}`;
     diretor.textContent = `Diretor: ${filme.Director}`;
     poster.setAttribute("src", filme.Poster);
}

function limparCampos() {
     titulo.textContent = "";
     sinopse.textContent = "";
     ano.textContent = "";
     duracao.textContent = "";
     genero.textContent = "";
     atores.textContent = "";
     diretor.textContent = "";
     poster.setAttribute("src", imgDefault);
}

function validaDados(filme) {
     if(filme.Plot === undefined || filme.Year === undefined || filme.Actors === "N/A") {
          throw new Error("Filme não encontrado!!!");
     }
}
