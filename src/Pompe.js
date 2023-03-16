import axios from "axios";
export default class Pompe {
  constructor(nom, volume, type) {
    (async () => {
      const response = await axios.post("http://localhost:3000/pompes", {
        nom: nom,
        volume: volume,
        type: type,
        estDisponible:true
      });
      this.id = response.data.id;
      this.nom = response.data.nom;
      this.volume = response.data.volume;
      this.type = response.data.type;
      this.estDisponible = response.data.estDisponible;
    })();}
  async getTypeCarburant(){
    let typeCarburant = "";
    try {
      const response = await axios.get(`http://localhost:3000/pompes/${this.id}`);
      typeCarburant = response.data.type;
    }
    catch (error) {
      console.error(error);
    }
    return typeCarburant;
  }

  async alimenter(volume) {
    let res = -1;
    try {
      const response = await axios.patch(`http://localhost:3000/pompes/${this.id}`, {
        volume: volume,
      });
      res = response.data.volume;
    } catch (error) {
      console.error(error);
    }
    return res;
  }
  async getVolumeDispo() {
    try {
      const response = await axios.get(`http://localhost:3000/pompes/${this.id}`);
      return response.data.volume;
    } catch (error) {
      console.error(error);
      return -1;
    }
  }
  async setEstDisponible(estDisponible) {
    try {
      const response = await axios.patch(`http://localhost:3000/pompes/${this.id}`, {
        estDisponible: estDisponible,
      });
      this.estDisponible = response.data.estDisponible;
    } catch (error) {
      console.error(error);
    }
  }

  async getEstDisponible() {
    try {
      const response = await axios.get(`http://localhost:3000/pompes/${this.id}`);
      return response.data.estDisponible;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  domElement = () => {
    let div = document.createElement("div");
    div.classList.add("pompe");
    div.innerHTML = `
      <h2>Pompe</h2>
      <p>Type de carburant: ${this.getTypeCarburant()}</p>
      <p>Volume max: ${this.getVolumeMax()}</p>
      <p>Volume dispo: ${this.getVolumeDispo()}</p>
    `;
    return div;
  };
}
