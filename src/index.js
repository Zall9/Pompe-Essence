import Caisse from "./Caisse.js";
import Pompe, { staticPump } from "./Pompe.js";
import axios from "axios";


// Création de la caisse
const caisse = new Caisse();

// Création des pompes

let Pompes = await axios.get("http://localhost:3000/pompes");
console.log("PUMPS", Pompes);
if (Pompes.data.length == 0) {
  const pompe1 = new Pompe("Diesel", 0, "Diesel");
  const pompe2 = new Pompe("Essence", 0, "Essence");
  const pompe3 = new Pompe("Ethanol", 0, "Ethanol");
}

// Ajout de la caisse à la station-service
const caisseDiv = document.querySelector("#caisse");

(async () => {
  try {
    const code = await caisse.domElement();
    caisseDiv.appendChild(code);
  } catch (error) {
    console.log(error);
  }
})();

// Ajout des pompes à la station-service
const pompesDiv = document.querySelector("#pompes");
Pompes.data.forEach(async (pompe) => {
  console.log("POMPE", pompe);
  const _serialPompe = new staticPump(pompe);
  console.log("POMPE_Serial", _serialPompe);
  const element = await staticPump.domElement(_serialPompe);
  pompesDiv.appendChild(element);
});

// click on validerCode
const createCode = document.querySelector("#validerCode");
createCode.addEventListener("click", () => {
  let typeCarburant = document.querySelector("#typeCarburant").value;
  let argent = document.querySelector("#qttCarburant").value;

  if (typeCarburant === "" || argent === "") {
    alert("Tous les champs doivent être remplis");
    return;
  }
  // if argent is not a number
  if (isNaN(argent)) {
    alert("Le montant doit être un nombre");
    return;
  }
  // if type Carburant into Diesel or Essence or Ethanol
  if (
    typeCarburant.toLowerCase() !== "diesel" &&
    typeCarburant.toLowerCase() !== "essence" &&
    typeCarburant.toLowerCase() !== "ethanol"
  ) {
    alert("Le type de carburant doit être un Diesel ou Essence ou Ethanol");
    return;
  }
  axios
    .post("http://localhost:3000/codes", {
      code: caisse.genererCode(typeCarburant, argent),
    })
    .then((response) => {
      console.log(response);
      alert("Votre code est: " + response.data.code);
      window.location.reload();
    });
});
