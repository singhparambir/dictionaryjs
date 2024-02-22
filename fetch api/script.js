let darkMode = localStorage.getItem('darkMode'); 

const darkModeToggle = document.querySelector('#dark-mode-toggle');
console.log(darkModeToggle);
const enableDarkMode = () => {
  // 1. Add the class to the body
  document.body.classList.add('darkmode');
  // 2. Update darkMode in localStorage
  localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => {
  // 1. Remove the class from the body
  document.body.classList.remove('darkmode');
  // 2. Update darkMode in localStorage 
  localStorage.setItem('darkMode', null);
}
 
// If the user already visited and enabled darkMode
// start things off with it on
if (darkMode === 'enabled') {
  enableDarkMode();
}

// When someone clicks the button
darkModeToggle.addEventListener('click', () => {
  // get their darkMode setting
  darkMode = localStorage.getItem('darkMode'); 
  console.log(darkMode);
  
  // if it not current enabled, enable it
  if (darkMode !== 'enabled') {
    enableDarkMode();
  // if it has been enabled, turn it off  
  } else {  
    disableDarkMode(); 
  }
});

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");


btn.addEventListener("click", () => {
    const inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <div class="word">
                    <h3 id="textToSpeak"> ${inpWord}</h3>
                    <p>${data[0].phonetic}</p>
                    <button onclick="texttospeech()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                   
                   
                </div>
                <h class="details" style="color:  gray;"> Meaning </h>
                <ul>
              <li>  <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
    
                </p></li>
                <li><p class="word-meaning">   ${data[0].meanings[0].definitions[1].definition} </p></li>
              <li>  <p class="word-meaning">   ${data[0].meanings[0].definitions[2].definition} </p></li>
                </ul> 
                <p class="details"  style="color: #ae9cff;"> Synonyms:   ${data[0].meanings[0].synonyms} </p>
                <p class = "details">
                ${data[0].meanings[1].partOfSpeech} </p>
                <p class="word-meaning">
                    ${data[0].meanings[1].definitions[0].example || ""}
                </p>
                <p class="source">Source:    ${data[0].sourceUrls[0]
                } </p> 
                `;

                 
            sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});




function texttospeech(){
// Get the text to be spoken
const textToSpeak = document.getElementById('textToSpeak').innerText;

// Create a new SpeechSynthesisUtterance instance
const utterance = new SpeechSynthesisUtterance(textToSpeak);

// Attach the speak button click event
  // Set the text to be spoken (in case it changes dynamically)
  utterance.text = document.getElementById('textToSpeak').innerText;

  // Use the SpeechSynthesis API to speak the text
  speechSynthesis.speak(utterance);

}


