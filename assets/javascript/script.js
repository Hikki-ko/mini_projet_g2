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
  let cities = []; //pour stocker les données des villes de l'API
  let currentcities = []; //stock les deux villes de la question actuelle
  let currentQuestion = 1;
  let correctScore = 0;

  // Sélecteur du nombre de questions
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

  // Fin sélecteur du nombre de questions
  // Fonction pour récupérer les données nécessaires
  async function getCities(numberOfQuestions) {
    const res = await fetch(
      `http://127.0.0.5:1000/locations?limit=${numberOfQuestions}`
    );
    const data = await res.json();
    cities = data.results;
    console.log("Liste des villes :", cities);
  }

  startButton.addEventListener("click", async () => {
    // Enregistrement du nombre de questions
    numberOfQuestions = sliderInput.value;
    await getCities(numberOfQuestions);
    document.getElementById("totalQuestions").innerHTML = numberOfQuestions;
    // Remplacement de la page d'introduction
    document.getElementById("introduction_content").classList.add("hidden");
    document.getElementById("quiz_container").classList.remove("hidden");
    document.getElementById("bg_music").play();

    // Démarrage du jeu
    async function pickTwoCities() {}
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

// Affichage villes
// getTwoCities().then(() => {
//   const city1 =
//     currentcities[0].locality || currentcities[0].name.split("-")[0].trim();
//   const city2 =
//     currentcities[1].locality || currentcities[1].name.split("-")[0].trim();

//   document.querySelectorAll(
//     ".nom_ville"
//   )[0].textContent = `${city1}, ${currentcities[0].country.name}`;
//   document.querySelectorAll(
//     ".nom_ville"
//   )[1].textContent = `${city2}, ${currentcities[1].country.name}`;
// });
