import axios from "axios";
import { Prix } from "./prix";

export default class Caisse {
  constructor(nom, quantite) {
    this.codes = new Map();
  }

  genererCode(typeCarburant, quantitéL) {
    let code =
      Math.random().toString(36).substr(2, 9) +
      "_" +
      typeCarburant +
      "_" +
      quantitéL;
    this.codes.set(code, { typeCarburant, quantitéL });
    return code;
  }

  verifierCode(code) {
    return this.codes.has(code);
  }

  getInfo(code) {
    return this.codes.get(code);
  }

  async getAllCode() {
    try {
      const response = await axios.get("http://localhost:3000/codes");
      return response.data.map((data) => data.code);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // faire une fonction prend le montant et renvoi le litre correspondant

  calculerLitre(montant, typeCarburant) {
    console.log("je suis dedans");
    if (montant === 0) return 0;

    // verifie if montant is a number
    if (isNaN(montant)) {
      // convert to number
      montant = +montant;
    }

    typeCarburant = typeCarburant.toLowerCase();
    if (typeCarburant === "diesel") {
      return montant / Prix.Diesel;
    }
    if (typeCarburant === "ethanol") {
      return montant / Prix.Ethanol;
    }
    if (typeCarburant === "essence") {
      return montant / Prix.Essence;
    }
  }

  calculerPrix(litre, typeCarburant) {
    if (litre === 0) return 0;

    // verifie if montant is a number
    if (isNaN(litre)) {
      // convert to number
      litre = +litre;
    }
    typeCarburant = typeCarburant.toLowerCase();
    if (typeCarburant === "diesel") {
      return litre * Prix.Diesel;
    }
    if (typeCarburant === "ethanol") {
      return litre * Prix.Ethanol;
    }
    if (typeCarburant === "essence") {
      return litre * Prix.Essence;
    }
  }
  // faire fonction qui prend le litre et renvoi le montant totale

  /// faire une fonction payer
  /**
   * @param pompe
   * @param code
   * la caisse alimente la pompe par rapport au montant donné par le code (code de forme 70ax6i8sr_diesel_100) les 3 derniers chiffres sont le montant maximum
   *  la caisse renvoie un code correspondant à la transaction
   *  ensuite l'utilisateur prends la pompe et débite le carburant de la pompe (dans index JS)
   * @returns
   */

  // async payer(code, pompe) {
  //   const montantCode = code.split("_")[2];
  //   const typeCarburant = code.split("_")[1];
  //   const idCarte = code.split("_")[0];

  //   // alimenter la pompe du montant en volume
  //   pompe.alimenter(montantCode);
  //   // enlever les 100 euros de la cartes (mais cartes la carte en memmoire)
  //   const newCode = await this.setMontantCode(idCarte, code, montantCode);
  // }

  async getCode(id) {
    try {
      const codes = this.getAllCode();
      codes.filter((code) => code.id === id);
      return codes[0];
    } catch (error) {
      console.error(error);
      return -1;
    }
  }

  async setMontantCode(id, code, montant) {
    try {
      const codes = this.getAllCode();
      codes.filter((code) => code.id === id);
      let old_amount = +codes[0].split("_")[2];
      let new_amount = old_amount - montant;
      if (new_amount > 0) {
        const response = await axios.patch(
          `http://localhost:3000/codes/${id}`,
          {
            code: code + "_" + new_amount,
          }
        );
        return response.data.code;
      }
      return -1;
    } catch (error) {
      console.error(error);
      return -1;
    }
  }

  async domElement() {
    const codes = await this.getAllCode();
    const div = document.createElement("div");
    div.classList.add("caisse");
    const h2 = document.createElement("h2");
    h2.innerHTML = "Les codes";
    div.appendChild(h2);
    const ul = document.createElement("ul");
    for (let code of codes) {
      const _code = code.split("_")[0];
      const li = document.createElement("li");
      // li.innerHTML=_code
      li.innerHTML = code;
      ul.appendChild(li);
    }
    div.appendChild(ul);
    return div;
  }
}
