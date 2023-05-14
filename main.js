const voiceList = document.querySelector("select");
const speechButton = document.querySelector("button");
const textContent = document.querySelector("textarea");

let isSpeaking = true, voiceSynth = speechSynthesis;

voices();

function voices() {

    for (let voice of voiceSynth.getVoices()) {

        let selected = (voice.name === "Google US English") ? "selected" : "";

        let optionStart = `<option value="${voice.name}" ${selected}>`;
        let optionContent = `${voice.name} (${voice.lang})`;

        let optionElement = optionStart + optionContent + "</option>";

        voiceList.insertAdjacentHTML("beforeend", optionElement);
    }
}

voiceSynth.addEventListener("voiceschanged", voices);

function narrate(text) {

    let utterance = new SpeechSynthesisUtterance(text);

    for (let voice of voiceSynth.getVoices()) {

        if (voice.name === voiceList.value) {

            utterance.voice = voice;
        }
    }

    voiceSynth.speak(utterance);
}

speechButton.addEventListener("click", (event) => {

    event.preventDefault();

    if (textContent.value !== "") {

        if (!voiceSynth.speaking) {

            narrate(textContent.value);
        }

        if (textContent.value.length > 30) {

            setInterval(() => {

                if (!voiceSynth.speaking && !isSpeaking) {

                    isSpeaking = true;

                    speechButton.innerText = "Narrate the Text";
                }

            }, 750);

            if (isSpeaking) {

                isSpeaking = false;
                voiceSynth.resume();

                speechButton.innerText = "Pause the Narration";

            } else {

                isSpeaking = true;
                voiceSynth.pause();

                speechButton.innerText = "Resume the Narration";
            }

        } else {

            speechButton.innerText = "Narrate the Text";
        }
    }
});
