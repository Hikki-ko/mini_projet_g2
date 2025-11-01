const http = require("http");
const https = require("https");
const url = require("url");

const API_KEY =
  "818da1085e7c8cc7389e4b0ac1a38065267d44aae3538f839c6527d128f4a740";
const API_URL = "https://api.openaq.org";

// Création du serveur et de sa fonction de réponse aux requêtes
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  // Parse de l'URL de la requête
  const parsedURL = url.parse(req.url, true);
  const limit = parsedURL.query.limit || 10; // Valeur minimale décidée

  // Appel à OpenAQ avec le paramètres "limit" défini dans le script du front
  const apiUrl = `${API_URL}/v3/locations?limit=${limit}`;

  https
    .get(apiUrl, { headers: { "X-API-KEY": API_KEY } }, (apiRes) => {
      let data = "";
      apiRes.on("data", (chunk) => (data += chunk));
      apiRes.on("end", () => res.end(data));
    })
    .on("error", (error) => {
      res.end(JSON.stringify({ error: "L'API n'est pas joignable." }));
    });
});

const hostname = "127.0.0.5"; // Déclaration de l'adresse IP du serveur
const port = 1000; // Déclaration du numéro du port du serveur web

// Lancement de l'écoute du serveur
server.listen(port, hostname, () => {
  console.log(
    `Sever web NODE.JS lancé à l'adresse http://${hostname}:${port}/`
  );
});
