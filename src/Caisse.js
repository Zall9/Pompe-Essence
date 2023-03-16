export default class Caisse {
  constructor() {
    this.codes = new Map();
  }

  payer(pompe, montant) {
    const code = this.genererCode();
    this.codes.set(code, { pompe, montant });
    return code;
  }

  genererCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  verifierCode(code) {
    return this.codes.has(code);
  }

  getInfo(code) {
    return this.codes.get(code);
  }
}
