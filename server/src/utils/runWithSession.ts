import mongoose, { ClientSession } from "mongoose";

type Fn<T> = (session: ClientSession) => Promise<T>;

export const runWithSession = async <T>(fn: Fn<T>) => {
    const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const res = await fn(session);
    await session.commitTransaction();
    return res;
  } catch (e) {
    await session.abortTransaction();
    throw e;
  }finally {
    session.endSession();
  }
};
