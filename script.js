// Query page for elements to control their behaviour
const micButton = document.querySelector('#microphone');
const panelsData = document.querySelector('#panels-data');

// When button is clicked, make it add class called "listening"
const onStartListening = () => {
    panelsData.classList.add('listening');
}

micButton.addEventListener('click', onStartListening);