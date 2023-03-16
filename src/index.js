import Caisse from "./Caisse.js";
import Pompe from "./Pompe.js";
// axios import
import axios from "axios";

// Création de la caisse
const caisse = new Caisse();
caisse.genererCode("Gazole", 50);
caisse.genererCode("Ethanol", 50);
caisse.genererCode("Essence", 50);

// Création des pompes
const pompe1 = new Pompe("Diesel", 100, 100);
const pompe2 = new Pompe("Essence", 100, 100);
const pompe3 = new Pompe("Ethanol", 100, 100);

// Ajout de la caisse à la station-service
const caisseDiv = document.querySelector("#caisse");
caisseDiv.appendChild(caisse.domElement());

// Ajout des pompes à la station-service
const pompesDiv = document.querySelector("#pompes");
pompesDiv.appendChild(pompe1.domElement());
pompesDiv.appendChild(pompe2.domElement());
pompesDiv.appendChild(pompe3.domElement());

// click on validerCode
const createCode = document.querySelector("#validerCode");
createCode.addEventListener("click", () => {
  let typeCarburant = document.querySelector("#typeCarburant").value;
  let quantiteL = document.querySelector("#qttCarburant").value;

  // if type Carburant into Diesel or Essence or Ethanol
  if (
    typeCarburant === "Diesel" ||
    typeCarburant === "Essence" ||
    typeCarburant === "Ethanol"
  ) {
    // if quantiteL is a number
    if (!isNaN(quantiteL)) {
      let code =
        Math.random().toString(36).substr(2, 9) +
        "_" +
        typeCarburant +
        "_" +
        quantiteL;
      console.log(code);

      const nouvelleDonnee = {
        code: code,
      };

      const url = "http://localhost:3000/codes";
      axios
        .post(url, nouvelleDonnee)
        .then((response) => {
          console.log("Donnée ajoutée avec succès:", response.data);
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de la donnée:", error);
        });
    } else {
      alert("La quantité de carburant doit être un nombre");
    }
  } else {
    alert("Le type de carburant doit être Diesel, Essence ou Ethanol");
  }
});
