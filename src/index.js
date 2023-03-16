import Caisse from "./Caisse.js";
import Pompe from "./Pompe.js";

// Création de la caisse
const caisse = new Caisse();

// Création des pompes
const pompe1 = new Pompe(1, caisse);
const pompe2 = new Pompe(2, caisse);

// Ajout des pompes à la station-service
const pompesDiv = document.querySelector("#pompes");
pompesDiv.appendChild(pompe1.domElement);
pompesDiv.appendChild(pompe2.domElement);

// Ajout de la caisse à la station-service
const caisseDiv = document.querySelector("#caisse");
caisseDiv.appendChild(caisse.domElement);
