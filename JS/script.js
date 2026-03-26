
/* ============================================================
  IMAGEM PADRAO - alterar imagem padrão para segunda
   ============================================================ */
let banner = document.getElementById('banner');
document.getElementById("changeImg").addEventListener("click", changeImg);
function changeImg() {
  let src = banner.getAttribute('src');

  if (src.includes("husky_2.webp")) {
    banner.setAttribute('src', "imagens/husky_3.webp");
  } else {
    banner.setAttribute('src', "imagens/husky_2.webp");
  }
}

// console.log(banner);


/* ============================================================
    MODO ESCURO
   ============================================================ */
let darktheme = document.getElementById("mudartema");
darktheme.addEventListener('click', mudartema);
function mudartema() {
  const bodytheme = document.querySelector("body");
  if (bodytheme.classList.contains('bg-dark', 'text-light')) {
    bodytheme.classList.remove('bg-dark', 'text-light');
    bodytheme.classList.add('bg-light', 'text-dark');
  } else {
    bodytheme.classList.remove('bg-light', 'text-dark');
    bodytheme.classList.add('bg-dark', 'text-light');
  }
}


/* ============================================================
    ATALHO: ENTER MOSTRA ALERTA
   ============================================================ */
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    alert("Tem a certeza que acabou o exercício?");
  }
});


/* ============================================================
    GERAR COR ALEATÓRIA PARA O BOTÃO
   ============================================================ */
document.getElementById("btn-color").addEventListener("click", function () {
  mudarCor(this);
});

function getRandom() {
  return Math.floor(Math.random() * 256);
}

function mudarCor(botao) {
  const r = getRandom();
  const g = getRandom();
  const b = getRandom();
  const cor = `rgb(${r}, ${g}, ${b})`;

  botao.style.backgroundColor = cor;
  botao.style.color = "white";
}


/* ============================================================
    PIADA DO DIA (API EM PORTUGUÊS)
   ============================================================ */
document.getElementById("btn-piada").addEventListener("click", () => {
  fetch("https://v2.jokeapi.dev/joke/Any?lang=pt")
    .then(r => r.json())
    .then(data => {
      const texto = data.joke || `${data.setup} — ${data.delivery}`;
      document.getElementById("piada-texto").textContent = texto;
    })
    .catch(() => {
      document.getElementById("piada-texto").textContent =
        "Não consegui carregar uma piada agora.";
    });
});


/* ============================================================
    ENVIAR URL DA FOTO - altera imagem padrão
   ============================================================ */


document.getElementById("btn-enviar-url").addEventListener("click", function () {
  const url = document.getElementById("foto").value.trim();
  if (!url) return;

  const img = document.getElementById("banner");
  img.src = url;
});



/* ============================================================
    ADICIONAR HOBBY - em uma lista
   ============================================================ */
document.getElementById("add-hobby").addEventListener("click", function () {
  const hobby = prompt("Digite um hobby:");
  if (!hobby || hobby.trim() === "") return;

  const lista = document.getElementById("lista-hobbies");

  const li = document.createElement("li");
  li.textContent = hobby;

  // MARCA como hobby criado pelo usuário
  li.classList.add("hobby-criado");

  lista.appendChild(li);
});


/* ============================================================
    ATUALIZAR CARD DE PORTFÓLIO - atualiza os elementos do card
   ============================================================ */
document.getElementById("form-portfolio").addEventListener("submit", function (event) {
  event.preventDefault();

  atualizarCard();
});

function atualizarCard() {
  const nome = document.querySelector(".name-form").value;
  const apresentacao = document.getElementById("apresentar").value;
  const fotoURL = document.getElementById("foto").value;
  const corFavorita = document.getElementById("favcolor").value;

  document.querySelector(".card-nome").textContent = nome;
  document.querySelector(".card-apresentar").textContent = apresentacao;
  document.getElementById("banner").src = fotoURL;

  const card = document.querySelector(".card-body");

  card.style.backgroundColor = corFavorita + "20";
  listItems.forEach(li => li.style.backgroundColor = corFavorita);
}

/* ============================================================
    RESETAR PORTFÓLIO - apaga os dados inseridos e volta ao padrão
   ============================================================ */
document.getElementById("reset").addEventListener("click", function () {

  document.querySelector(".name-form").value = "";
  document.getElementById("apresentar").value = "";
  document.getElementById("foto").value = "";
  document.querySelector(".card-nome").textContent = "Nome";
  document.querySelector(".card-apresentar").textContent = "Apresentação";
  document.getElementById("foto-new").src = "";

  const card = document.querySelector(".card-body");
  card.style.backgroundColor = "white";

  // REMOVE APENAS hobbies criados
  const hobbiesCriados = document.querySelectorAll("#lista-hobbies .hobby-criado");
  hobbiesCriados.forEach(h => h.remove());
  });

/* ============================================================
    GERAR FOTO ALEATÓRIA (DOG OU CAT)
   ============================================================ */

document.getElementById("mudarfoto").addEventListener("click", async function () {

  const tipo = Math.random() < 0.5 ? "dog" : "cat";  /* 0.5 = 50% como um cara ou coroa...*/
  let url = "";

  if (tipo === "dog") {
    const resposta = await fetch("https://dog.ceo/api/breeds/image/random");
    const dados = await resposta.json();
    url = dados.message;
  } else {
    const resposta = await fetch("https://api.thecatapi.com/v1/images/search");
    const dados = await resposta.json();
    url = dados[0].url;
  }

  document.getElementById("foto-new").src = url;


});
















