class Persist {
  private storage: Storage;
  private readonly storeKey: string;

  constructor(storeKey: string) {
    this.storage = window.localStorage;
    this.storeKey = storeKey;

    if (!this.storage.getItem(storeKey)) {
      this.storage.setItem(this.storeKey, JSON.stringify({}));
    }
  }

  setItem(key: string, value: any) {
    const storageString = this.storage.getItem(this.storeKey);
    if (!storageString) return;

    const storageObject = JSON.parse(storageString);
    storageObject[key] = value;
    this.storage.setItem(this.storeKey, JSON.stringify(storageObject));
  }
  getItem(key: string, defaultValue: any = undefined): unknown {
    const storageString = this.storage.getItem(this.storeKey);
    if (!storageString) return;

    const storageObject = JSON.parse(storageString);
    if (!storageObject.hasOwnProperty(key)) {
      this.setItem(key, defaultValue);
      return defaultValue;
    }
    return storageObject[key];
  }
}

let persist = new Persist('v0.0.1');

export { persist };
