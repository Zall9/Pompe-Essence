// Déclaration des variables et constantes
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
let pompes = [
  { id: 1, volume: 1000 },
  { id: 2, volume: 1000 },
  { id: 3, volume: 1000 },
];
let codes = {};

// Middleware
app.use(bodyParser.json());

// Routes
app.post("/caisse", (req, res) => {
  const montant = req.body.montant;
  const pompeId = req.body.pompeId;
  if (
    montant <= 0 ||
    montant > 100 ||
    !pompeId ||
    pompes[pompeId - 1].volume === 0
  ) {
    res.status(400).send("Mauvaise demande");
  } else {
    const code = Math.floor(Math.random() * 1000000);
    codes[code] = { pompeId: pompeId, quantite: montant };
    res.send(code.toString());
  }
});

app.post("/pompe", (req, res) => {
  const code = req.body.code;
  const quantite = codes[code].quantite;
  const pompeId = codes[code].pompeId;
  if (
    !codes[code] ||
    !pompeId ||
    !quantite ||
    quantite > pompes[pompeId - 1].volume
  ) {
    res.status(400).send("Mauvaise demande");
  } else {
    pompes[pompeId - 1].volume -= quantite;
    codes[code].quantite -= quantite;
    res.send("Transfert réussi");
  }
});

// Lancement du serveur
app.listen(port, () => {
  console.log("Le serveur écoute sur le port ${port}");
});
