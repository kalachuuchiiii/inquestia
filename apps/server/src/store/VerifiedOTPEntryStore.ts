import { BaseStore } from "./BaseStore";

export type VerifiedEntryValue = { createdAt: Date };

export class VerifiedOTPEntry extends BaseStore<VerifiedEntryValue> {
  constructor() {
    super("5m", "30d");
  }

  verifyEntry = (key: string) => {
    this.set(key, { createdAt: new Date() });
  }

  isVerified = (key: string) => {
    return !!this.get(key);
  };
}

export const verifiedEntriesStore = new VerifiedOTPEntry();