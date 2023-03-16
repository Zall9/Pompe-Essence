import Caisse from "./Caisse.js";
import Pompe from "./Pompe.js";

export default class Station {
  constructor() {
    this.caisse = new Caisse();
    this.pompes = [new Pompe(1), new Pompe(2), new Pompe(3), new Pompe(4)];
  }

  get caisse() {
    return this._caisse;
  }

  set caisse(caisse) {
    this._caisse = caisse;
  }

  get pompes() {
    return this._pompes;
  }

  set pompes(pompes) {
    this._pompes = pompes;
  }

  fairePlein(idPompe, montant) {
    const code = this.caisse.payer(montant, idPompe);
    const pompe = this.pompes.find((p) => p.id === idPompe);
    return pompe.delivrer(code);
  }
}
