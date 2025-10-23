// Déclarations variables
const API_KEY =
  "63c89bc4a68f3733d17ec87750e68ab04de872ba71f88f7703f2ea0161502834";

/**************
 *	On ajoute un évènement "lorsque l'arborescence DOM est chargée".
 *   Ainsi, nous sommes certains de manipuler des élements
 *	chargés et existants dans notre DOM.
 **************/
window.addEventListener("DOMContentLoaded", (event) => {
  // Pseudo-code !!!
  //const nombre_questions = "valeur récupérée dans l'HTML";
  //const liste_villes =
    "https://api.openaq.org/v3/locations?limit=${nombre_questions}";

  //On récupère les éléments du DOM
  const confirmButton = document.querySelector('.button');
  const cityItems=document.querySelectorAll('.city_item');
  const correctScoreElement = document.getElementById('correctScore');
  const totalQuestionsElement = document.getElementById('totalQuestions');
  const radioSelect = document.querySelectorAll('input[type="radio"]');
  const musiqueFond = document.querySelector('#musiqueFond');


  //On définit les données du jeu
  let correctScore = 0;
  let totalQuestions = 10;
  let currentQuestion = 0;
  let cityData = []; //pour stocker les données des villes de l'API

  function initGame(){
    correctScore = 0;
    currentQuestion = 0;
    correctScoreElement.textContent=correctScore;
    totalQuestionsElement.textContent= currentQuestion + "/" + totalQuestions;

    RandomCities();
  }

  async function RandomCities(){
    alert ('le jeu commence');
  }

  confirmButton.addEventListener('click',() => {

    initGame();
  });

  // Effet sonore de click sur le formulaire
  document.addEventListener('click', () => {
    const clickSound = new Audio('assets/audio/clic_radio.mp3');
    clickSound.volume = 0.3;
    clickSound.play();
  });

  // Musique de fond sur premier clic
  document.addEventListener('click', () => {
    musiqueFond.volume = 0.2;
    musiqueFond.play();
  }, { once: true });

});
