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
    typeCarburant = typeCarburant.toLowerCase();
    if (typeCarburant === "diesel") {
      return montant / Prix.diesel;
    }
    if (typeCarburant === "gazole") {
      return montant / Prix.gazole;
    }
    if (typeCarburant === "essence") {
      return montant / Prix.essence;
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

  async payer(code, pompe) {
    const montantCode = code.split("_")[2];
    const typeCarburant = code.split("_")[1];
    const idCarte = code.split("_")[0];

    // alimenter la pompe du montant en volume
    pompe.alimenter(montantCode);
    // enlever les 100 euros de la cartes (mais cartes la carte en memmoire)
    const newCode = await this.setMontantCode(idCarte, code, montantCode);
    // afficher les deux boutons commencer et fini
    // est dispo on le met a false
    // des qu'il clique chaque seconde mon debite 2 litres
    // quand il a fini on met est dispo a true
    // on affiche le montant total
    // on affiche le code de transaction
    // si le montant est insuffisant on affiche un message d'erreur
    // si le montant n'est pas consonmme totalement on remet la difference sur la carte
    // on vide la pompe pour le prochain client
  }

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
    h2.innerHTML = "Caisse";
    div.appendChild(h2);
    const ul = document.createElement("ul");
    for (let code of codes) {
      const li = document.createElement("li");
      li.innerHTML = code;
      ul.appendChild(li);
    }
    div.appendChild(ul);
    return div;
  }
}
