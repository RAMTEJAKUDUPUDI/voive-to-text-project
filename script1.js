let recognition;
let a = document.getElementById("kk");
let message = document.querySelector("#message");
const transcription = document.getElementById("transcription");

function myFunction() {
    document.getElementById("demo").innerHTML = "Recording is on";
    recognition.start();
}

document.getElementById("command-button").addEventListener("click", myFunction);

const languageSelector = document.getElementById("languageSelector");
languageSelector.addEventListener("change", () => {
    recognition.lang = languageSelector.value;
});

function initializeSpeechRecognition() {
    recognition = new webkitSpeechRecognition();
    recognition.lang = languageSelector.value;
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = function (event) {
        let last = event.results.length - 1;
        let command = event.results[last][0].transcript;
        a.textContent = "Recognized speech: " + command;
        let box = document.querySelector(".box");
        let top = parseInt(window.getComputedStyle(box).getPropertyValue("top"));
        let left = parseInt(window.getComputedStyle(box).getPropertyValue("left"));
        if (command.toLowerCase() === "move up") {
            box.style.top = top - 40 + "px";
        } else if (command.toLowerCase() === "move down") {
            box.style.top = top + 40 + "px";
        } else if (command.toLowerCase() === "move right") {
            box.style.left = left + 40 + "px";
        } else if (command.toLowerCase() === "move left") {
            box.style.left = left - 40 + "px";
        }
    };

    recognition.onerror = function (event) {
        message.textContent = "Error occurred in recognition: " + event.error;
    };
}

initializeSpeechRecognition();
