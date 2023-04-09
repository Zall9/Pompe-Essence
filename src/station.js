import Caisse from "./Caisse.js";
import Pompe from "./Pompe.js";

export default class Station {
  constructor() {
    this.caisse = new Caisse();
    this.pompes = [new Pompe(1), new Pompe(2), new Pompe(3), new Pompe(4)];
  }

  constructor(caisse, pompes) {
    this.caisse = caisse;
    this.pompes = pompes;
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
}
