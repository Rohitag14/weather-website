console.log('Clint side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');
const messageThree = document.getElementById('message-3');
// messageOne.textContent= 'hello';

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    messageThree.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error;
            }
            else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.weather;
                messageThree.textContent = data.NOTE;
            }
        })
    })
});