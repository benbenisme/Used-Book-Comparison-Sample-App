import { VolumeStore } from "./volume";

export class RootStore {
    volumeStore;
    constructor() {
        this.volumeStore = new VolumeStore(this);
    }
}