import { BaseStore } from "./BaseStore";

export type SeenSurveyValue = {
  createdAt: Date;
  seenIds: string[];
};

class SeenSurveyStore extends BaseStore<SeenSurveyValue> {
  constructor() {
    super("1h", "1h");
  }

  addToSet = (key: string, seenId: string) => {
    const entry = this.get(key);
    if (!entry) {
      return "not_ok";
    }
    const newSeenIds = [...entry.seenIds, seenId];
    this.set(key, {
      createdAt: new Date(),
      seenIds: newSeenIds,
    });
  };
}

export const seenSurveyStore = new SeenSurveyStore();
