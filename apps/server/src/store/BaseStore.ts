import ms from "ms";

type StoreOptions = {
  requireValue: boolean;
};

export class BaseStore<
  T extends {
    createdAt: Date;
  },
> {
  public store = new Map<string, T>();
  public ttl: number;
  public cleanUpInterval: number;

  constructor(
    expiresIn: ms.StringValue,
    cleanUpInterval: ms.StringValue = "5m"
  ) {
    this.ttl = ms(expiresIn);
    this.cleanUpInterval = ms(cleanUpInterval);
    this.cleanUp();
  }

   protected deleteIfExpired = (
    key: string
  ): "deleted" | "missing" | "not_deleted" => {
    const val = this.store.get(key);
    if (!val) {
      return "missing";
    }
    const now = Date.now();
    if (now - val.createdAt.getTime() > this.ttl) {
      this.store.delete(key);
      return "deleted";
    }
    return "not_deleted";
  };

  protected getStore = () => this.store;

  get = (key: string) => {
    this.deleteIfExpired(key);
    return this.store.get(key);
  };

  set = (key: string, value: T) => {
    this.store.set(key, value);
  };

  delete = (key: string) => {
    this.store.delete(key);
  };

  cleanUp = () => {
    setInterval(() => {
      for (const [key] of this.store) {
        this.deleteIfExpired(key);
      }
    }, this.cleanUpInterval);
  };
}
