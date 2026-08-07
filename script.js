const html = document.querySelector("html");

const textoBanner = document.querySelector(".app__title");
const imgBanner = document.querySelector(".app__image");

// Define botões
const arrBt = document.querySelectorAll(".app__card-button");
const btFoco = document.querySelector(".app__card-button--foco");
const btCurto = document.querySelector(".app__card-button--curto");
const btLongo = document.querySelector(".app__card-button--longo");

// Define temporizador
const btStartPause = document.querySelector("#start-pause");
let temporizador = 0;
let intervalo = null;
const timerTexto = document.querySelector("#timer");
timerTexto.innerHTML = defineTempo();

// Define musica
const btMusica = document.querySelector(".toggle");
const musica = new Audio("assets/audio/luna-rise-part-one.mp3");
musica.loop = true;


btFoco.addEventListener("click", () => {

    alterarContexto("foco");

    btFoco.classList.add("active");

    timerTexto.innerHTML = defineTempo();

})

btCurto.addEventListener("click", () => {

    alterarContexto("descanso-curto");

    btCurto.classList.add("active");

    timerTexto.innerHTML = defineTempo();

})

btLongo.addEventListener("click", () => {

    alterarContexto("descanso-longo");

    btLongo.classList.add("active");

    timerTexto.innerHTML = defineTempo();
   

})

function alterarContexto(contexto) {
    // Altera tema da página
    html.setAttribute("data-contexto", contexto);
    
    // Altera imagem do banner 
    imgBanner.setAttribute("src", `assets/imgs/${contexto}.png`);

    // Remove classe de destaque de todos o bt, para ser ativada somente no botão selecionao
    arrBt.forEach((elemento)=> {
        elemento.classList.remove("active");
    })

    alterarTextoBanner(contexto);

    
}

function alterarTextoBanner(contexto) {
    switch (contexto) {
        case "foco":
            textoBanner.innerHTML = ` Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            textoBanner.innerHTML = `Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta.</strong>`;
            break;
        case "descanso-longo":
        textoBanner.innerHTML = `Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>`;
        break;
        default:
            break;
    }
}

// Ativa ou desativa musica 
btMusica.addEventListener("change", () =>
{
    console.log("ativo")
    if (musica.paused) {
        musica.play();
    }
    else {
        musica.pause();
    }
})


// Define o tempo do timer com base no contexto atual
function defineTempo() {
    let contextoAtual = html.getAttribute("data-contexto");

    switch (contextoAtual) {
        case "foco":
            temporizador = 40;
            break;
        case "descanso-curto":
            temporizador = 10;
            break;
        case "descanso-longo":
            temporizador = 15;
            break;
        default:
            break;
    }
    return temporizador;
}

function contagemRegressiva() {

    if (intervalo) return;

    temporizador = defineTempo();

    intervalo = setInterval(() => {
        temporizador -= 1;
        // deve ser atualizado de acordo com o valor do timer
        timerTexto
        console.log(temporizador);

        if (temporizador <= 0) {
            clearInterval(intervalo);
            intervalo = null;
        }
    }, 1 * 1000)

}

btStartPause.addEventListener("click", () => {

    contagemRegressiva();

    const textoStartPause
    btStartPause.innerHTML = `img class="app__card-primary-butto-icon" src="assets/imgs/play_arrow.png" 
    alt=""> <span>Pause</span>`
});

