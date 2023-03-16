export default class Pompe {
  constructor(typeCarburant, volumeMax, volumeDispo) {
    this.volumeMax = volumeMax;
    this.volumeDispo = volumeDispo;
    this.typeCarburant = typeCarburant;
    this.estDisponible = true;


    if(volumeDispo > volumeMax){
      throw new Error("Le volume disponible est supérieur au volume max.");
    }

  }


  getTypeCarburant(){
    return this.typeCarburant;
  }

  alimenter(volume) {
    if (volume > this.volumeDispo) {
      throw new Error("Volume insuffisant dans la pompe.");
    }

    this.estDisponible = false;

    this.volumeDispo -= volume;

    time.setTimeout(() => {
      1000;
    }, timeout);
  }

  getVolumeDispo() {
    return this.volumeDispo;
  }

  getVolumeMax() {
    return this.volumeMax;
  }

  setEstDisponible(estDisponible) {
    this.estDisponible = estDisponible;
  }
  getEstDisponible() {
    return this.estDisponible;
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
