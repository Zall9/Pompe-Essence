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

let Pompes = await axios.get("http://localhost:3000/pompes");
console.log("PUMPS",Pompes)
if(Pompes.data.length == 0){
  const pompe1 = new Pompe("Diesel", 100, 100);
  const pompe2 = new Pompe("Essence", 100, 100);
  const pompe3 = new Pompe("Ethanol", 100, 100);
}
// Ajout de la caisse à la station-service
const caisseDiv = document.querySelector("#caisse");

(async () => {
  try {
    const element = await caisse.domElement();
    caisseDiv.appendChild(element);
  } catch (error) {
    console.log(error);
  }
})();


// Ajout des pompes à la station-service
const pompesDiv = document.querySelector("#pompes");
Pompes.data.forEach(async (pompe) => {
  console.log("POMPE",pompe)
  const element = await Pompe.domElement(pompe);
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
  if (typeCarburant.toLowerCase() !== "diesel" && typeCarburant.toLowerCase() !== "essence" &&  typeCarburant.toLowerCase() !== "ethanol") {
    alert("Le type de carburant doit être un Diesel ou Essence ou Ethanol");
    return;
  }
  axios.post("http://localhost:3000/codes", {
    code: caisse.genererCode(typeCarburant, argent),
  }).then((response) => {
    console.log(response);
    // reload page
    window.location.reload();
  });
} 
);
