import axios from "axios";
import { Prix } from "./prix";

// import caisse
import Caisse from "./Caisse";

export default class Pompe {
  constructor(nom, volume, type) {
    (async () => {
      const response = await axios.post("http://localhost:3000/pompes", {
        nom: nom,
        volume: volume,
        type: type,
        estDisponible: true,
      });
      this.id = response.data.id;
      this.nom = response.data.nom;
      this.volume = response.data.volume;
      this.type = response.data.type;
      this.estDisponible = response.data.estDisponible;
    })();
  }
  async getTypeCarburant() {
    let typeCarburant = "";
    try {
      const response = await axios.get(
        `http://localhost:3000/pompes/${this.id}`
      );
      typeCarburant = response.data.type;
    } catch (error) {
      console.error(error);
    }
    return typeCarburant;
  }

  async alimenter(volume) {
    let res = -1;
    try {
      const response = await axios.patch(
        `http://localhost:3000/pompes/${this.id}`,
        {
          volume: volume,
        }
      );
      res = response.data.volume;
    } catch (error) {
      console.error(error);
    }
    return res;
  }
  async getVolumeDispo() {
    try {
      const response = await axios.get(
        `http://localhost:3000/pompes/${this.id}`
      );
      return response.data.volume;
    } catch (error) {
      console.error(error);
      return -1;
    }
  }
  async setEstDisponible(estDisponible) {
    try {
      const response = await axios.patch(
        `http://localhost:3000/pompes/${this.id}`,
        {
          estDisponible: estDisponible,
        }
      );
      this.estDisponible = response.data.estDisponible;
    } catch (error) {
      console.error(error);
    }
  }

  async getEstDisponible() {
    try {
      const response = await axios.get(
        `http://localhost:3000/pompes/${this.id}`
      );
      return response.data.estDisponible;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async alimenterPompe() {
    console.log("alimenterPompe");
  }

  static domElement = async (pump) => {
    const div = document.createElement("div");
    div.classList.add("pompe");
    const h2 = document.createElement("h2");
    h2.innerHTML = pump.nom;
    div.appendChild(h2);
    const p = document.createElement("p");
    p.innerHTML = "Volume disponible: " + pump.volume;
    div.appendChild(p);
    const p2 = document.createElement("p");
    p2.innerHTML = "Type de carburant: " + pump.type;
    div.appendChild(p2);
    const p3 = document.createElement("p");
    p3.innerHTML = "Disponible: " + pump.estDisponible;
    div.appendChild(p3);

    const inputCode = document.createElement("input");
    inputCode.setAttribute("type", "text");
    inputCode.setAttribute("placeholder", "Code");
    div.appendChild(inputCode);

    const buttonAlimenter = document.createElement("button");
    // add text to button
    buttonAlimenter.textContent = "Alimenter";
    buttonAlimenter.addEventListener("click", (pump) => pump.alimenterPompe());

    const buttonFinish = document.createElement("button");
    // add text to button
    buttonFinish.textContent = "Terminer";

    buttonFinish.addEventListener("click", () => alert("test"));

    div.appendChild(buttonAlimenter);

    div.appendChild(buttonFinish);

    return div;
  };
}

export class staticPump {
  constructor(pump) {
    this.id = pump.id;
    this.nom = pump.nom;
    this.volume = pump.volume;
    this.type = pump.type;
    this.estDisponible = pump.estDisponible;
    this.caisse = new Caisse();
  }
  async getTypeCarburant() {
    let typeCarburant = "";
    try {
      const response = await axios.get(
        `http://localhost:3000/pompes/${this.id}`
      );
      typeCarburant = response.data.type;
    } catch (error) {
      console.error(error);
    }
    return typeCarburant;
  }

  async alimenter(volume, pumpid) {
    let res = -1;
    try {
      const response = await axios.patch(
        `http://localhost:3000/pompes/${this.id}`,
        {
          volume: volume,
        }
      );
      res = response.data.volume;
    } catch (error) {
      console.error(error);
    }

    // get from dom with id vol + pump
    const vol = document.getElementById("vol" + pumpid);
    vol.innerHTML = "Volume disponible: " + res;
    return res;
  }
  async getVolumeDispo() {
    try {
      const response = await axios.get(
        `http://localhost:3000/pompes/${this.id}`
      );
      return response.data.volume;
    } catch (error) {
      console.error(error);
      return -1;
    }
  }
  async setEstDisponible(estDisponible) {
    try {
      const response = await axios.patch(
        `http://localhost:3000/pompes/${this.id}`,
        {
          estDisponible: estDisponible,
        }
      );
      this.estDisponible = response.data.estDisponible;
    } catch (error) {
      console.error(error);
    }

    // get from dom with id vol + pump
    const vol = document.getElementById("dispo" + this.id);
    vol.innerHTML = "Disponible: " + this.estDisponible;
  }

  async getEstDisponible() {
    try {
      const response = await axios.get(
        `http://localhost:3000/pompes/${this.id}`
      );
      return response.data.estDisponible;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getCode(id) {
    try {
      const codes = await this.getAllCode();
      codes.filter((code) => code.id === id);
      return codes[0];
    } catch (error) {
      console.error(error);
      return -1;
    }
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

  async alimenterPompe(pumpid) {
    console.log("alimenterPompe");

    if (this.estDisponible === false) {
      alert("Pompe indisponible");
      return;
    }

    const inputCode = document.getElementById("code" + pumpid).value;
    const inputReservoir = document.getElementById("reservoir" + pumpid).value;

    if (inputReservoir === "") {
      alert("Veuillez entrer un volume");
      return;
    }

    const reservoir = +inputReservoir;

    // if code is null
    if (inputCode === "") {
      alert("Veuillez entrer un code");
      return;
    }

    // verifie if code in db.json
    const response = await axios.get("http://localhost:3000/codes");
    const codes = response.data;
    const code = codes.find((code) => code.code === inputCode);

    if (code === undefined) {
      alert("Code invalide");
      return;
    }

    const codeElement = code.code;

    // separe value of code
    const codeValue = codeElement.split("_");
    // value
    console.log(codeValue);

    const startText = codeValue[0];
    const typeCarburant = codeValue[1];
    const prix = codeValue[2];

    //verifie si le type de carburant est le meme que la pompe
    const typePompe = await this.getTypeCarburant();
    if (typeCarburant !== typePompe) {
      alert("Type de carburant invalide");
      window.location.reload();
      return;
    }

    // get le volume avec le prix
    const volume = this.caisse.calculerLitre(prix, typeCarburant);
    // arrondir avec aucun chiffre apres la virgule je veux zero chiffre apres la virgule
    const volumeArrondi = Math.round(volume * 100) / 100;
    // alimenter la pompe de volumeArrondi
    await this.alimenter(volumeArrondi, pumpid);
    // update estDisponible to true
    await this.setEstDisponible(false);

    // convertir le reservoir en argent
    const argent = this.caisse.calculerPrix(reservoir, typeCarburant);

    // re create a new code
    const newPrice = +prix - argent;
    const newCode = startText + "_" + typeCarburant + "_" + ~~newPrice;

    // update code in db.json
    await axios.patch(`http://localhost:3000/codes/${code.id}`, {
      code: newCode,
    });
    console.log("le nouveau code est : " + newCode);

    await this.setEstDisponible(true);
    const newVolume = (await this.getVolumeDispo()) - reservoir;
    await this.alimenter(~~newVolume, pumpid);
  }

  static domElement = async (pump) => {
    const div = document.createElement("div");
    div.classList.add("pompe");
    const h2 = document.createElement("h2");
    h2.innerHTML = pump.nom;
    div.appendChild(h2);
    const p = document.createElement("p");
    p.setAttribute("id", "vol" + pump.id);
    p.innerHTML = "Volume disponible: " + pump.volume;
    div.appendChild(p);
    const p2 = document.createElement("p");
    p2.innerHTML = "Type de carburant: " + pump.type;
    div.appendChild(p2);
    const p3 = document.createElement("p");
    // add id to p3
    p3.setAttribute("id", "dispo" + pump.id);
    p3.innerHTML = "Disponible: " + pump.estDisponible;
    div.appendChild(p3);

    const inputReservoir = document.createElement("input");
    inputReservoir.setAttribute("type", "text");
    inputReservoir.setAttribute("id", "reservoir" + pump.id);
    inputReservoir.setAttribute(
      "placeholder",
      "Donner le volume de votre réservoir"
    );
    div.appendChild(inputReservoir);

    const br = document.createElement("br");
    div.appendChild(br);

    const inputCode = document.createElement("input");
    inputCode.setAttribute("type", "text");
    inputCode.setAttribute("id", "code" + pump.id);
    inputCode.setAttribute("placeholder", "Votre code");
    div.appendChild(inputCode);

    const buttonAlimenter = document.createElement("button");
    // add text to button

    // add different id to button
    buttonAlimenter.setAttribute("id", "alimenter" + pump.id);

    buttonAlimenter.textContent = "Alimenter";
    buttonAlimenter.addEventListener("click", async (event) => {
      await pump.alimenterPompe(pump.id);
      console.log("alimenterPompe:", pump.id);
      event.preventDefault();
    });
    div.appendChild(buttonAlimenter);
    return div;
  };
}
