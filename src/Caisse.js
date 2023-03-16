// import axios
import axios from "axios";

export default class Caisse {
  constructor() {
    this.codes = new Map();
  }

  payer(pompe, montant) {
    const code = this.genererCode();
    this.codes.set(code, { pompe, montant });
    return code;
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

  getAllCode() {
    axios
      .get("http://localhost:3000/codes")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  domElement = () => {
    let div = document.createElement("div");
    div.classList.add("caisse");

    // generate the HTML for the caisse h2 caisse and the list of codes
    div.innerHTML = `
      <h2>Caisse</h2>
      <p>Codes disponibles:</p>
      <ul>
        ${[...this.codes.keys()].map((code) => `<li>${code}</li>`).join("")}
      </ul>
    `;
    return div;
  };
}
