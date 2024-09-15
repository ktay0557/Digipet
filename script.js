// Query page for elements to control their behaviour
const micButton = document.querySelector('#microphone');
const panelsData = document.querySelector('#panels-data');
const transcript = document.querySelector('#transcript');
const screen = document.querySelector('#screen');

const COMMANDS = ['eat', 'dance', 'sleep'];

// Use browser built-in speech recognition interface
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Create instance of this class
const speech = new SpeechRecognition();

// When button is clicked, make it add class called "listening"
const onStartListening = () => {
    speech.start();
    panelsData.classList.add('listening');
}

// For when speech is over
const onResult = (event) => {
    panelsData.classList.remove('listening');
    // To get text the speech recognition picked up
    const text = event.results[0][0].transcript;
    // Display text on screen
    transcript.innerText = `You said: ${text}`;

    const action = COMMANDS.find((command) => {
        return text.toLowerCase().includes(command);
    });

    if (action) {
        // If vaild command is provided
        screen.classList.add(`digipet-screen_${action}`);
    } else {
        // If invalid command is provided
        transcript.innerText += ' - Alert! Not a valid command!'
    }

    const removeAnimationClass = () => {
        screen.classList.remove(`digipet-screen_${action}`);
        transcript.innerText = '';
    }
    setTimeout(removeAnimationClass, 3000);
}

const onError = (event) => {
    console.error(event.error);
}

micButton.addEventListener('click', onStartListening);
speech.addEventListener('result', onResult);
speech.addEventListener('error', onError);