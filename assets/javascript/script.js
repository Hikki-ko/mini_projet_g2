// Déclarations variables
const API_KEY =
  "818da1085e7c8cc7389e4b0ac1a38065267d44aae3538f839c6527d128f4a740";
const API_URL = "https://api.openaq.org";

/**************
 *	On ajoute un évènement "lorsque l'arborescence DOM est chargée".
 *   Ainsi, nous sommes certains de manipuler des élements
 *	chargés et existants dans notre DOM.
 **************/
window.addEventListener("DOMContentLoaded", (event) => {
  // ### Page d'introduction ###
  document.getElementById("introduction_content").hidden = false;
  const startButton = document.querySelector("#startButton");

  //Variables globales
  let numberOfQuestions;
  let cityData = []; //pour stocker les données des villes de l'API
  let currentcities = []; //stock les deux villes de la question actuelle
  let currentQuestion = 1;
  let correctScore = 0;

  // Fonction sélecteur du nombre de questions
  let selector = document.querySelector(".selector");
  let selectValue = document.querySelector(".select_value");
  let sliderInput = document.querySelector("#slider_input");
  let progressBar = document.querySelector(".progress_bar");

  selectValue.innerText = sliderInput.value;
  progressBar.style.width = `${sliderInput.value}%`;

  sliderInput.oninput = () => {
    let value = sliderInput.value;
    selector.style.left = `${value}%`;
    selectValue.innerText = value;
    progressBar.style.width = `${value}%`;
  };

  startButton.addEventListener("click", () => {
    // Enregistrement du nombre de questions
    numberOfQuestions = sliderInput.value;
    document.getElementById("totalQuestions").innerHTML = numberOfQuestions;
    // Remplacement de la page d'introduction
    document.getElementById("introduction_content").classList.add("hidden");
    document.getElementById("quiz_container").classList.remove("hidden");
    document.getElementById("bg_music").play();

    // Démarrage du jeu
    async function getTwoCities() {
      const res = await fetch(
        `${API_URL}/v3/locations?limit=${numberOfQuestions}`,
        {
          headers: { "X-API-KEY": API_KEY },
        }
      );
      const data = await res.json();
      console.log(data);
    }
    getTwoCities();
  });
});

// Démarrage du quizz
// function initGame() {
//   correctScore = 0;
//   currentQuestion = 0;
//   correctScoreElement.textContent = correctScore;
//   totalQuestionsElement.textContent = currentQuestion + "/" + totalQuestions;

//   RandomCities();
// }

// async function RandomCities() {
//   alert("le jeu commence");
// }

// confirmButton.addEventListener("click", () => {
//   initGame();
// });

// //On récupère les éléments du DOM
// const confirmButton = document.querySelector(".button");
// const cityItems = document.querySelectorAll(".city_item");
// const correctScoreElement = document.getElementById("correctScore");
// const totalQuestionsElement = document.getElementById("totalQuestions");
// const radioSelect = document.querySelectorAll('input[type="radio"]');
// const musiqueFond = document.querySelector("#musiqueFond");

// //On définit les données du jeu
// let correctScore = 0;
// let totalQuestions = 10;
// let currentQuestion = 0;
// let cityData = []; //pour stocker les données des villes de l'API

// // Effet sonore de click sur le formulaire
// document.addEventListener("click", () => {
//   const clickSound = new Audio("assets/audio/clic_radio.mp3");
//   clickSound.volume = 0.3;
//   clickSound.play();
// });

// // Musique de fond sur premier clic
// document.addEventListener(
//   "click",
//   () => {
//     musiqueFond.volume = 0.2;
//     musiqueFond.play();
//   },
//   { once: true }
// );
