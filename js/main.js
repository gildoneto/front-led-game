// while (num != teste){
//     getNumber()
//         if (num < teste){
//             console.log('Menor')
//         } else if (num > teste) {
//             console.log('Maior')
//         } else {
//             console.log(`Parabéns, você acertou! O número é ${num}`)
//         }
//     }
// https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300

'use strict';

const endpoint = 'https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300'

let inputNumber = null
let gameNumber = null

let test = document.getElementById('test')
let display = document.getElementById('display')


const assignNumber = () => {
    inputNumber = document.getElementById('input').value;
}

const displayNumber = () => {
    display.innerText = inputNumber.toString()
}

const displayTest = (inputNumber, gameNumber) => {
    if (inputNumber < gameNumber){
        test.innerText = 'É menor'
    } else if (inputNumber > gameNumber) {
        test.innerText = 'É maior'
    } else {
        test.innerText = `Você acertou! ${gameNumber}`
    }
}

const startGame = async() => {
    inputNumber = 0
    gameNumber = 0

    const data = await fetch(endpoint)
    if(data.status == 502){
        test.innerText = 'Ocorreu um erro. Tente novamente.'
        display.innerText = '502'
    } else {
        const returnedNumber = await data.json()
        gameNumber = returnedNumber.value
        display.innerText = '0'
        test.innerText = 'Digite um número entre 1 e 300'
        console.log(gameNumber)
    }
}

const testNumber = () => {
    assignNumber()
    if (inputNumber < 1 || inputNumber > 300){
        test.innerText = 'Digite um número entre 1 e 300'
    } else {
        displayNumber()
        displayTest(inputNumber, gameNumber)
    }

}