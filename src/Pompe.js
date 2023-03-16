export default class Pompe {
  constructor(volumeMax) {
    this.volumeMax = volumeMax;
    this.volumeDispo = volumeMax;
  }

  alimenter(volume) {
    if (volume > this.volumeDispo) {
      throw new Error("Volume insuffisant dans la pompe.");
    }
    this.volumeDispo -= volume;
  }

  getVolumeDispo() {
    return this.volumeDispo;
  }

  getVolumeMax() {
    return this.volumeMax;
  }
}
