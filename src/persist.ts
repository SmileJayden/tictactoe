interface StorageObject {
  [key: string]: any;
}

class Persist {
  private storage: Storage;
  private readonly storeKey: string;

  constructor(storeKey: string) {
    this.storage = window.localStorage;
    this.storeKey = storeKey;

    if (!this.storage.getItem(storeKey)) {
      this.storage.clear();
      this.storage.setItem(this.storeKey, JSON.stringify({}));
    }
  }

  getStorageObject(): StorageObject {
    const storageString = this.storage.getItem(this.storeKey);
    if (!storageString) throw new Error('Cannot find storage');
    return JSON.parse(storageString);
  }

  setItem(key: string, value: any): void {
    const storageObject = this.getStorageObject();
    storageObject[key] = value;
    this.storage.setItem(this.storeKey, JSON.stringify(storageObject));
  }
  getItem<T>(key: string, defaultValue: T): T {
    const storageObject = this.getStorageObject();
    if (!storageObject.hasOwnProperty(key)) {
      this.setItem(key, defaultValue);
      return defaultValue;
    }
    return storageObject[key];
  }
}

let persist = new Persist('v0.0.1');

export { persist };
