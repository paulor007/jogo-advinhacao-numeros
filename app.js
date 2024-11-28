// Geração do número aleatório entre 1 e 100
let numeroAleatorio = Math.floor(Math.random() * 100) + 1;
let tentativas = 0;
let jogoAtivo = true;
let numeroGerados = []; // Lista de números gerados

numeroGerados.push(numeroAleatorio);
console.log(`Número gerado: ${randomNumber}`);
console.log(`Números gerados até agora: ${generatedNumbers.join(', ')}`);

// Seleção dos elementos do DOM
const guessInput = document.getElementById('guessInput');
const botaoChutar = document.querySelector('.container_botao:nth-child(1)');
const botaoReiniciar = document.getElementById('reiniciar');
const textoSubtitulo = document.querySelector('.texto_paragrafo');


// Função para verificar o chute
function verificarChute() {
    if (!jogoAtivo) {
        return;
    }

    let userInput = guessInput.value;
    let validation = validateInput(userInput);

    if (!validation.valid) {
       textoSubtitulo.innerHTML = validation.message;
       speakMessage(validation.message);
       return;
    }

    tentativas++;
    let guess = validation.guess;

    if (guess == numeroAleatorio) {
        let tentativaText = tentativas === 1 ? 'tentativa' : 'tentativas';
        let mensagemSucesso = `Parabéns! Você acertou o número em ${attempts} ${tentativaText}.`;
    }
}

// Função para validar a entrada do usuário
function validateInput(input) {
    let guess = Number(input);
    if (isNan(guess)) {
        return {valid: false, message: 'Por favor, digite um número válido.'};
    }
    if (guess < 1 || guess > 100) {
        return { valid: false, message: 'O número deve estar entre 1 e 100.' };
    }
    return {valid: true, guess: guess}
}

// Função para sintetizar voz feminina
function speakMessage(message) {
    let speech = new SpeechSynthesisUtterance();
    speech.lang = 'pt-BR';
    speech.text = message;
    speech.pitch = 1; // Tom da voz
    speech.rate = 1;  // Velocidade da fala

    // Selecionar uma voz feminina
    const voices = window.speechSynthesis.getVoices();
    const femaleVoices = voices.filter(voice => voice.lang === 'pt-BR' && (voice.gender === 'female' || voice.name.includes('Female') || voice.name.includes('feminina') || voice.name.includes('Maria') || voice.name.includes('Luciana')));
    if (femaleVoices.length > 0) {
        speech.voice = femaleVoices[0];
    } else {
        // Se não encontrar, usar a primeira voz em português
        speech.voice = voices.find(voice => voice.lang === 'pt-BR');
    }
    window.speechSynthesis.speak(speech);
}

// Carregar as vozes disponíveis (necessário para alguns navegadores)
window.speechSynthesis.onvoiceschanged = function() {
    // Iniciar com uma mensagem de boas-vindas
    speakMessage('Bem-vindo ao Jogo da Adivinhação! Por favor, digite seu palpite.');
};


