let speechToText = null;
speechToText = window.speechSynthesis;
if (speechToText) {
    const utter = new SpeechSynthesisUtterance("Hello");
    speechToText.speak(utter);
}

export default () => { 
    
}