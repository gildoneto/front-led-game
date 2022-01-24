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

const getNumber = async() => {
    const inputNumber = document.getElementById('input').value;
    const data = await fetch(endpoint)
    const returnedNumber = await data.json()
    console.log(returnedNumber)
}