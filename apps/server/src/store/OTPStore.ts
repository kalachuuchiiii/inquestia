import { ENV_CONFIG } from "@/config/env";
import { BaseStore } from "./BaseStore";
import bcrypt from "bcryptjs";

export type OTPValue = {
  createdAt: Date;
  codeHash: string;
};

export class OTPStoreClass extends BaseStore<OTPValue> {
  constructor() {
    super("5m", "30d");
  }


  setOTP = async (key: string, code: string) => {
    try {
      const codeHash = await bcrypt.hash(code, ENV_CONFIG.SALT_ROUNDS);
      this.set(key, {
        createdAt: new Date(),
        codeHash,
      });
      return "ok";
    } catch (e) {
      return "not_ok";
    }
  };

  isCodeCorrect = async (key: string, code: string) => {
    const entry = this.get(key);
    if (!entry) {
      return false;
    }
    const isCorrect = await bcrypt.compare(code, entry.codeHash);
    if (isCorrect) {
      this.delete(key);
    }
    return isCorrect;
  };
}

export const OTPStore = new OTPStoreClass();
