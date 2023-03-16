// import axios
import axios from "axios";

export default class Caisse {
  constructor() {
    this.codes = [];
  }

  // payer(pompe, montant) {
  //   const code = this.genererCode();
  //   this.codes.set(code, { pompe, montant });
  //   return code;
  // }

  genererCode(typeCarburant, quantitéL) {
    let code =
      Math.random().toString(36).substr(2, 9) +
      "_" +
      typeCarburant +
      "_" +
      quantitéL;
    //this.codes.set(code, { typeCarburant, quantitéL });
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
        for (const element of response.data) {
          this.codes.push(element["code"]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  domElement = () => {
    let div = document.createElement("div");
    div.classList.add("caisse");

    // get all code from with method getAllCode
    this.getAllCode();
    console.log(this.codes);
    for (code of this.codes) {
      let codeDiv = document.createElement("div");
      codeDiv.innerHTML = code;
      div.appendChild(codeDiv);
      console.log(code);
    }
    return div;
  };
}
