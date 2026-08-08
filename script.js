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
let temporizador = new Date();
let intervalo = null;
const timerTexto = document.querySelector("#timer");
defineTempo();

// Define musica
const btMusica = document.querySelector(".toggle");
const musica = new Audio("assets/audio/luna-rise-part-one.mp3");
musica.loop = true;

const pauseAudio = new Audio("assets/audio/pause.mp3");
const playAudio = new Audio("assets/audio/play.wav");
const beep = new Audio("assets/audio/beep.mp3");


btFoco.addEventListener("click", () => {

    alterarContexto("foco");

    btFoco.classList.add("active");

    pausarContador();
    defineTempo();

})

btCurto.addEventListener("click", () => {

    alterarContexto("descanso-curto");

    btCurto.classList.add("active");

    pausarContador();
    defineTempo();

})

btLongo.addEventListener("click", () => {

    alterarContexto("descanso-longo");

    btLongo.classList.add("active");

    defineTempo();
    pausarContador();


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
    if (musica.paused) {
        musica.play();
    }
    else {
        musica.pause();
    }
})


// Define o tempo do timer e o texto;
function defineTempo() {
    let contextoAtual = html.getAttribute("data-contexto");

    switch (contextoAtual) {
        case "foco":
            temporizador = 40 * 60; // Declarado em segundos;
            break;
        case "descanso-curto":
            temporizador = 10 * 60;
            break;
        case "descanso-longo":
            temporizador = 15 * 60;
            break;
        default:
            break;
    }
    atualizarDisplay();
    return temporizador;
}

function atualizarDisplay() {

    const minutos = Math.floor(temporizador / 60);
    const segundos = temporizador % 60;

    const minutosFormatado = String(minutos).padStart(2, '0');
    const segundosFormatado = String(segundos).padStart(2, '0');

    timerTexto.innerHTML = `${minutosFormatado}:${segundosFormatado}`;
}

function contagemRegressiva() {

    if (intervalo) return;

    intervalo = setInterval(() => {
        temporizador -= 1;
        atualizarDisplay();
        
        if (temporizador <= 0) {
            beep.play();
            pausarContador();
            
        }
    }, 1 * 1000)//executa a função a cada 1 segundo)

}
function pausarContador() {
    clearInterval(intervalo);
    intervalo = null;
}

btStartPause.addEventListener("click", () => {
    // Insere audio ao clicar no botão
   
    // Muda o texto do botão
    btStartPause.innerHTML = `<img class="app__card-primary-butto-icon" src="assets/imgs/pause.png" alt=""><span>Pausar</span>`
    if (intervalo) {
        btStartPause.innerHTML = `<img class="app__card-primary-butto-icon" src="assets/imgs/play_arrow.png" alt=""><span>Começar</span>`
        pausarContador();
        pauseAudio.play();
    } else {
        if (temporizador <= 0)
        {
            temporizador = defineTempo();
        }
        playAudio.play();
        contagemRegressiva();
    }
    

});

