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
}

export class staticPump {
  constructor(pump, code = null) {
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

  async alimenter(volume) {
    let res = -1;
    const volumeCourrant = this.volume;
    try {
      // update requets
      const response = await axios
        .patch(`http://localhost:3000/pompes/${this.id}`, {
          volume: ~~(volumeCourrant + volume),
        })
        .catch((err) => {
          console.log(err);
        });
      res = response.data.volume;
      this.volume = res;
    } catch (error) {
      console.error(error + " from set alimenter");
    }

    // get from dom with id vol + pump
    const vol = document.getElementById("vol" + this.id);
    vol.innerHTML = "Volume disponible: " + res;
    return res;
  }

  async debiter(volume) {
    let res = -1;
    const volumeCourrant = this.volume;
    try {
      let result = ~~(volumeCourrant - volume);
      if (result < 0) {
        result = 0;
      }

      const response = await axios.patch(
        `http://localhost:3000/pompes/${this.id}`,
        {
          volume: result,
        }
      );
      res = response.data.volume;
      this.volume = res;
    } catch (error) {
      console.error(error + " from set est debiter");
    }
    // get from dom with id vol + pump
    const vol = document.getElementById("vol" + this.id);
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
      console.error(error + " from set est dispo");
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

  async getCodeStartWith(code) {
    try {
      const response = await axios.get("http://localhost:3000/codes");
      let codes = response.data.map((data) => data.code);

      // split each codes with _
      const codesSplit = codes.map((code) => code.split("_"));
      // loop through codesSplit and check if index 0 is equal to code
      for (let i = 0; i < codesSplit.length; i++) {
        if (codesSplit[i][0] === code) {
          // print type of carburant
          let carburant = codesSplit[i][1];
          let code = codesSplit[i][0];
          let volume = codesSplit[i][2];
          let codeCarburant = code + "_" + carburant + "_" + volume;
          return codeCarburant;
        }
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getId(code) {
    try {
      const response = await axios.get("http://localhost:3000/codes");
      let codes = response.data.map((data) => data.code);
      const codesSplit = codes.map((code) => code.split("_"));
      for (let i = 0; i < codesSplit.length; i++) {
        if (codesSplit[i][0] === code) {
          return i + 1; // id start at 1
        }
      }
    } catch (error) {
      console.error(error);
      return -1;
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
    if (
      inputCode === "" ||
      inputReservoir === "" ||
      inputCode === undefined ||
      inputReservoir === undefined
    ) {
      alert("Veuillez entrer un code");
      return;
    }

    // delete space in inputCode and inputReservoir
    inputCode.trim();
    inputReservoir.trim();

    console.log("le code est : ", inputCode);
    console.log("le reservoir est : ", reservoir);

    // verifie if code in db.json
    const response = await axios.get("http://localhost:3000/codes");
    const codes = response.data;

    let code = await this.getCodeStartWith(inputCode);

    if (code === undefined) {
      alert("Code invalide");
      return;
    }

    console.log("le code commence par est : ", code);

    // // get id of code
    const id = await this.getId(inputCode);
    console.log("l'id du code est : ", id);

    // separe value of code
    const codeValue = code.split("_");
    const startText = codeValue[0];
    const typeCarburant = codeValue[1];
    const montantSurCarte = codeValue[2];

    console.log("le startText est : ", startText);
    console.log("le typeCarburant est : ", typeCarburant);
    console.log("le prix est : ", montantSurCarte);

    //verifie si le type de carburant est le meme que la pompe
    const typePompe = await this.getTypeCarburant();
    if (typeCarburant.toLowerCase() !== typePompe.toLowerCase()) {
      alert("Type de carburant invalide");
      window.location.reload();
      return;
    }
    console.log("le type de pompe du get est : ", typePompe);
    console.log("le type de carburant est : ", typeCarburant);

    // Je veux le prix du volume du reservoir
    const valeurDeReservoir = this.caisse.calculerPrix(
      reservoir,
      typeCarburant
    );
    console.log("le prix est : ", valeurDeReservoir);
    const volume = this.caisse.calculerLitre(montantSurCarte, typeCarburant);

    if (montantSurCarte < valeurDeReservoir) {
      alert(
        "Vous n'avez pas assez d'argent, nous avons rempli votre reservoir au maximum possible de votre solde de la carte"
      );
      // remplir pour tous son reservoir en fonction de son prix
      // et supprimer la carte
      console.log(
        "votre montant du reservoir est superieur a celui de votre carte "
      );
      console.log("la valeur de reservoir est : ", volume);

      console.log("j'alimente");

      // set timeout to set estDisponible to false
      await this.setEstDisponible(false);

      const volumeArrondi = Math.round(volume * 100) / 100;

      await this.alimenter(volumeArrondi); // alimente la pompe

      // update estDisponible to true

      await this.setEstDisponible(true);

      // get volume de la pompe
      const volumePompe = await this.getVolumeDispo();

      console.log("le volume de la pompe est : ", volumePompe);

      // alimente new volume

      await this.debiter(volumeArrondi);

      await axios.delete(`http://localhost:3000/codes/${id}`);
    } else {
      console.log(
        "votre montant du reservoir est superieur a celui de votre carte "
      );
      console.log("la valeur de reservoir est : ", volume);
      console.log("j'alimente");

      await this.setEstDisponible(false);

      const volumeArrondi = Math.round(volume * 100) / 100;

      await this.alimenter(volumeArrondi).then(async (responseAlimenter) => {
        await this.setEstDisponible(true).then(
          async (responseSetEstDisponible) => {
            const newPrice = +montantSurCarte - valeurDeReservoir;
            const newCode = startText + "_" + typeCarburant + "_" + ~~newPrice;

            console.log("le nouveau code est : ", newCode);
            await this.debiter(volumeArrondi).then(async (responseDebiter) => {
              try {
                await axios.patch(`http://localhost:3000/codes/${id}`, {
                  code: newCode,
                });
              } catch (error) {
                console.error(error);
              }
            });
          }
        );
      });
      // update estDisponible to tru
      //alert("Le nouveau solde de votre carte est de " + newPrice + "€");
    }
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
      window.location.reload();
    });
    div.appendChild(buttonAlimenter);
    return div;
  };
}
