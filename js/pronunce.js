function speak() {
    speechSynthesis.speak(new SpeechSynthesisUtterance(document.querySelector('#exampleInputDesp').value));
}