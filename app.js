let numeroLimite = 100;
let quantidadeTentativas = 0;
let numerosSorteados = [];
let numeroSecreto = sortearNumeroSecreto();

function textoDinamico(tag, texto) {
    let textoAlterado = document.querySelector(tag);
    textoAlterado.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
}

function textoInicial() {
    textoDinamico('h1', 'Jogo do Número Secreto');
    textoDinamico('p', `Escolha um número entre 1 e ${numeroLimite}`);
}

textoInicial();

function sortearNumeroSecreto() {
    let numeroSecreto = parseInt(Math.random() * numeroLimite + 1);

    if (numerosSorteados.length == numeroLimite) {
        numerosSorteados = [];
    }

    if (numerosSorteados.includes(numeroSecreto)) {
        return sortearNumeroSecreto();
    } else {
        numerosSorteados.push(numeroSecreto);
        console.log(numerosSorteados);
        return numeroSecreto;
    }
}

function verificarChute() {
    let escolhaUsuario = document.querySelector('input').value;

    if (escolhaUsuario != '') {
        quantidadeTentativas++;
        let textoTentativa = quantidadeTentativas > 1 ? 'tentativas' : 'tentativa';
        if (escolhaUsuario == numeroSecreto) {
            textoDinamico('h1', 'Parabéns, você descobriu o número secreto!');
            textoDinamico('p', `Você acertou em ${quantidadeTentativas} ${textoTentativa}!`);
            document.getElementById('chutar').setAttribute('disabled', true);
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
            if (escolhaUsuario > numeroSecreto) {
                textoDinamico('p', 'O número secreto é menor...');
            } else {
                textoDinamico('p', 'O número secreto é maior...');
            }
        }
    }
}

function novoJogo() {
    textoInicial();
    numeroSecreto = sortearNumeroSecreto();
    quantidadeTentativas = 0;
    let campoInput = document.querySelector('input');
    campoInput.value = '';
    document.getElementById('chutar').removeAttribute('disabled');
    document.getElementById('reiniciar').setAttribute('disabled', true);
}