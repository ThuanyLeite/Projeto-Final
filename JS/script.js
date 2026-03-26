  let nome = document.querySelector(".name-form")
  let apresentacao = document.getElementById("apresentar")
  let fotoURL = document.getElementById("foto")
  let corFavorita = document.getElementById("favcolor")
  let card = document.querySelector(".card-body");
  let banner = document.getElementById('banner');
  let apresentar = document.querySelector(".card-apresentar")
  let card_nome = document.querySelector(".card-nome")

/* ============================================================
  IMAGEM PADRAO - alterar imagem padrão para segunda
   ============================================================ */

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
  let r = getRandom();
  let g = getRandom();
  let b = getRandom();
  let cor = `rgb(${r}, ${g}, ${b})`;

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

  let img = document.getElementById("banner");
  img.src = url;
});



/* ============================================================
    ADICIONAR HOBBY - em uma lista
   ============================================================ */
document.getElementById("add-hobby").addEventListener("click", function () {
  const hobby = prompt("Digite um hobby:");
  if (!hobby || hobby.trim() === "") return;

  let lista = document.getElementById("lista-hobbies");

  let li = document.createElement("li");
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
  card_nome.textContent = nome.value;
  apresentar.textContent = apresentacao.value;
  banner.src = fotoURL.value;

  card.style.backgroundColor = corFavorita.value + "20"; // cor mais clara

localStorage.setItem("nome", nome.value);
localStorage.setItem("apresentacao", apresentacao.value);
localStorage.setItem("fotoURL", fotoURL.value);
localStorage.setItem("corFavorita", corFavorita.value);

 let count = parseInt(localStorage.getItem("profileCount") || "0");
  count++;
  localStorage.setItem("profileCount", count);

document.getElementById("contador").innerText = `Perfil atualizado ${count} vezes`;

}

/* ============================================================
    RESETAR PORTFÓLIO - apaga os dados inseridos e volta ao padrão
   ============================================================ */
document.getElementById("reset").addEventListener("click", function () {

  nome.value = "";
  apresentacao.value = "";
  fotoURL.value = "";
  card_nome.textContent = "Nome";
  apresentar.textContent = "Apresentação";
  banner.src = "imagens/husky_2.webp";

  card.style.backgroundColor = "white";

  // REMOVE APENAS hobbies criados
  let hobbiesCriados = document.querySelectorAll("#lista-hobbies .hobby-criado");
  hobbiesCriados.forEach(h => h.remove());
  });

/* ============================================================
    GERAR FOTO ALEATÓRIA (DOG OU CAT)
   ============================================================ */

document.getElementById("mudarfoto").addEventListener("click", async function () {

  let tipo = Math.random() < 0.5 ? "dog" : "cat";  /* 0.5 = 50% como um cara ou coroa...*/
  let url = "";

  if (tipo === "dog") {
    let resposta = await fetch("https://dog.ceo/api/breeds/image/random");
    let dados = await resposta.json();
    url = dados.message;
  } else {
    let resposta = await fetch("https://api.thecatapi.com/v1/images/search");
    let dados = await resposta.json();
    url = dados[0].url;
  }

  document.getElementById("foto-new").src = url;


});















