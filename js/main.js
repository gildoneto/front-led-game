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

let botao = document.getElementById('test')

botao.addEventListener('onclick', getNumber)

function getNumber() {
    const number = document.getElementById('input').value
    fetch(endpoint).then(console.log)
    alert(number)
}



