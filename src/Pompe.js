import axios from "axios";
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

  async alimenterPompe() {
    // get le conteneur de l'input with id code
    const inputCode = document.getElementById("code" + this.id);
    const code = inputCode.value;

    const codeInfo = await this.getCode(code);
    console.log(codeInfo);
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
    inputCode.setAttribute("id", "code" + pump.id);
    inputCode.setAttribute("placeholder", "Code");
    div.appendChild(inputCode);

    const buttonAlimenter = document.createElement("button");
    // add text to button
    buttonAlimenter.textContent = "Alimenter";
    buttonAlimenter.addEventListener("click", (event) => {
      event.preventDefault();
      pump.alimenterPompe();
    });

    const buttonFinish = document.createElement("button");
    // add text to button
    buttonFinish.textContent = "Terminer";

    buttonFinish.addEventListener("click", () => alert("test"));

    div.appendChild(buttonAlimenter);

    div.appendChild(buttonFinish);

    return div;
  };
}
