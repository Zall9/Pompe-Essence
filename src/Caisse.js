import axios from "axios";

export default class Caisse {
  constructor(nom, quantite) {
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

  getAllCode(codes) {
    let result = [];
    axios
      .get("http://localhost:3000/codes")
      .then((response) => {
        console.log("response from AXIOS/CODES", response);
        for (response of response.data) {
          result.push(response.code);
        }
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  domElement = () => {
    this.codes = this.getAllCode();
    const div = document.createElement("div");
    const ul = document.createElement("ul");
    for (let code of this.codes) {
      const li = document.createElement("li");
      li.innerHTML = code;
      ul.appendChild(li);
    }
    return div;
  };
}
