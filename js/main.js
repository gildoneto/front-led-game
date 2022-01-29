'use strict';

const endpoint = 'https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300'

const number0 = document.querySelectorAll("#number-0 use");
const number1 = document.querySelectorAll("#number-1 use");
const number2 = document.querySelectorAll("#number-2 use");

let buttonStart = document.getElementById('start-game-button')
let buttonSend = document.getElementById('send-game-button')

let inputNumber = 0
let gameNumber = 0

let test = document.getElementById('test')
let display = document.getElementById('display')
let numberInput = document.getElementById('number-input')

handleNumber(0)

/**
 * @function switchSendButton
 * Habilita/desabilita o botão de enviar o palpite.
 * @param {string} action - 'on' ou 'off'
 */
const switchSendButton = (action) => {
    
    if (action === 'on') {
        buttonSend.classList.remove('gray')
        buttonSend.classList.add('orange')
        buttonSend.disabled = false
        numberInput.disabled = false
    } else if (action === 'off') {
        buttonSend.classList.add('gray')
        buttonSend.classList.remove('orange')
        buttonSend.disabled = true
        numberInput.disabled = true
    } else {
        console.log('Erro no método switchSendButton()')
    }

}

/**
 * @function startGame
 * Recupera um número de 1 a 300 através do endpoint.
 * Prepara para o início do jogo de palpites.
 */
const startGame = async () => {
    const data = await fetch(endpoint)
    
    buttonStart.classList.add('d-none')
    inputNumber = 0
    gameNumber = 0
    numberInput.value = ''
    
    test.classList.remove('red')
    test.classList.remove('green')

    if (data.status == 502) {
        test.classList.add('red')
        test.innerText = 'ERRO'
        handleNumber(502,'red')
        buttonStart.classList.remove('d-none')
        switchSendButton('off')
    } else {
        const returnedNumber = await data.json()
        gameNumber = returnedNumber.value
        handleNumber(0)
        test.classList.add('orangered')
        test.innerText = ''
        switchSendButton('on')
        buttonStart.classList.add('d-none')
        console.log(gameNumber)
    }
}

startGame()

/**
 * @function assignNumber
 * Associa o número digitado pelo usuário ao numberInput
 */
const assignNumber = () => {
    inputNumber = numberInput.value
}

/**
 * @function displayTest
 * Compara o número digitado pelo usuário.
 * Exibe resultado se maior, menor ou acertou.
 * Exibe número digitado no painel de 7 segmentos.
 * @param {number} inputNumber 
 * @param {number} gameNumber 
 */
const displayTest = (inputNumber, gameNumber) => {
    let cor = undefined
    test.classList.remove('green')
    test.classList.remove('red')
    if (inputNumber < gameNumber) {
        test.innerText = 'É menor'
    } else if (inputNumber > gameNumber) {
        test.innerText = 'É maior'
    } else {
        test.innerText = `Você acertou! ${gameNumber}`
        cor = 'green'
        test.classList.add('green')
        buttonStart.classList.remove('d-none')
        switchSendButton('off')
    }
    handleNumber(inputNumber,cor)
}

/**
 * @function testNumber
 * Testa se o número digitado está entre 1 e 300,
 * e se é maior, menor ou acertou.
 */
const testNumber = () => {
    
    assignNumber()
    numberInput.value = ''

    if (inputNumber < 1 || inputNumber > 300) {
        test.innerText = 'Digite um número entre 1 e 300'
    } else {
        displayTest(inputNumber, gameNumber)
    }
}

/**
 * @function hideShowNumber
 * Exibe/esconde os números no painel de 7 segmentos
 * @param {string} type 
 * @param {number} number 
 */
function hideShowNumber(type, number) {
    switch (type) {
        case 'hide':
            document.getElementById(`number-${number}`).classList.add('d-none')
            break;

        default:
            document.getElementById(`number-${number}`).classList.remove('d-none')
            break;
    }
}

/**
 * @function handleNumber
 * Desenha os números no painel de 7 segmentos.
 * 1 a 3 algarismos.
 * @param {number} inputNumber 
 * @param {string} cor 
 */
function handleNumber(inputNumber, cor) {
    cor = cor || 'black'
    let numberString = inputNumber.toString()
    let length = numberString.length    

    switch (length) {
        case 2:
            lightNumber(number0, numberString[0], cor)
            lightNumber(number1, numberString[1], cor)
            lightNumber(number2, '0', cor)
            hideShowNumber('show', 0)
            hideShowNumber('show', 1)
            hideShowNumber('hide', 2)
            break;
        case 3:
            lightNumber(number0, numberString[0], cor)
            lightNumber(number1, numberString[1], cor)
            lightNumber(number2, numberString[2], cor)
            hideShowNumber('show', 0)
            hideShowNumber('show', 1)
            hideShowNumber('show', 2)
            break;
        default:
            lightNumber(number0, numberString[0], cor)
            lightNumber(number1, '0', cor)
            lightNumber(number2, '0', cor)
            hideShowNumber('show', 0)
            hideShowNumber('hide', 1)
            hideShowNumber('hide', 2)
            break;
    }
}

/**
 * @function lightNumber
 * Desenha 1 algarismo de LED através no número informado.
 * @param {NodeList} svg 
 * @param {string} number 
 * @param {string} color 
 */
function lightNumber(svg, number, color) {
    switch (number) {
        case '1':
            lightEach([1, 2], svg, color);
            break;
        case '2':
            lightEach([0, 1, 3, 4, 6], svg, color);
            break;
        case '3':
            lightEach([0, 1, 2, 3, 6], svg, color);
            break;
        case '4':
            lightEach([1, 2, 5, 6], svg, color);
            break;
        case '5':
            lightEach([0, 2, 3, 5, 6], svg, color);
            break;
        case '6':
            lightEach([0, 2, 3, 4, 5, 6], svg, color);
            break;
        case '7':
            lightEach([0, 1, 2], svg, color);
            break;
        case '8':
            lightEach([0, 1, 2, 3, 4, 5, 6], svg, color);
            break;
        case '9':
            lightEach([0, 1, 2, 3, 5, 6], svg, color);
            break;
        default:
            lightEach([0, 1, 2, 3, 4, 5], svg, color);
            break;
    }
}

/**
 * @function lightEach
 * Ativa cada LED de acordo com o número de algarismos.
 * @param {[number]} postions 
 * @param {NodeList} svg 
 * @param {string} color 
 */
function lightEach(postions, svg, color) {
    for (let i = 0; i < svg.length; i++) {
        const element = svg[i];
        element.classList.remove('black')
        element.classList.remove('green')
        element.classList.remove('red')
    }
    postions.forEach((i) => svg[i].classList.add(color));
}