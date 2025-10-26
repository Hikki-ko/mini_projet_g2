// Déclarations variables
const API_KEY =
  "28ac8a70505094e8eaabd8e9386a5df44fae18cc3ede6a261a52ca073dc58b62";

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
    const numberOfCities = fetchCities(numberOfQuestions * 2);
    // Remplacement de la page d'introduction
    document.getElementById("introduction_content").classList.add("hidden");
    document.getElementById("quiz_container").classList.remove("hidden");
    document.getElementById("bg_music").play();
  });

  async function fetchCities(numberOfCities) {
    const url = `https://api.openaq.org/v3/locations?limit=${numberOfCities}&order_by=random`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-API-Key': '28ac8a70505094e8eaabd8e9386a5df44fae18cc3ede6a261a52ca073dc58b62',
          'Origin': 'http://127.0.0.1:5500'  // Explicite l'origine
        },
        mode: 'cors',  // Force le mode CORS
      });

      if (!response.ok) {
        throw new Error(`Erreur: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json(); //On convertit les données en objet JSON
      console.log("Données API reçues:", data.results);

      // Filtrer les villes avec des données pm25 valides - données utilisés pour comparer les taux de pollution
      cityData = data.results.filter(city =>
        city.parameters && city.parameters.pm25 && city.parameters.pm25.length > 0
      );

      //On vérigie qu'on a assez de villes après le filtrage
      if (cityData.length<numberOfCities){
        alert('Pas assez de villes pour commencer le quizz, veuillez choisir moins de questions')
        return fetchCities(numberOfCities);
      };

      console.log('villes filtrées :', cityData);
      return cityData.slice(0, numberOfCities);

    } catch (error) {
      console.error("Erreur dans fetchCities:", error);
      alert("Impossible de récupérer les villes. Vérifiez votre connexion ou réessayez plus tard.");
      return null; 
    }
  }


  

  // //On définit les données du jeu
  // let correctScore = 0;
  // let totalQuestions = 10;
  // let currentQuestion = 0;
  

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
});
