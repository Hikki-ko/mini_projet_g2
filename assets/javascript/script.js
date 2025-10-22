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
  const nombre_questions = "valeur récupérée dans l'HTML";
  const liste_villes =
    "https://api.openaq.org/v3/locations?limit=${nombre_questions}";
});
