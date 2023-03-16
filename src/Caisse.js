import axios from "axios";

export default class Caisse {
  constructor(nom, quantite) {
    this.codes = [];
  }

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

  async getAllCode() {
    try {
      const response = await axios.get("http://localhost:3000/codes");
      return response.data.map((data) => data.code);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async domElement() {
    const codes = await this.getAllCode();
    const div = document.createElement("div");
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
