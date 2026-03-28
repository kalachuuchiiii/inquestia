import type { UserModel, UserSchema, UserMethods } from "@/models";
import type { ClientSession, HydratedDocument } from "mongoose";
import { STREAK_MIN } from "@inquestia/constants";


export const updateUserStreakIfNeeded = (
  user: HydratedDocument<UserSchema, UserMethods>,
  session?: ClientSession
) => {
  if (!user.streak) {
    return;
  }

  const now = new Date();
  const lastResponseTime = new Date(user.streak.lastResponseTime);

  // Get dates without time component for day comparison
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lastResponse = new Date(
    lastResponseTime.getFullYear(),
    lastResponseTime.getMonth(),
    lastResponseTime.getDate()
  );

  // Calculate difference in days
  const daysDifference = Math.floor(
    (today.getTime() - lastResponse.getTime()) / (1000 * 60 * 60 * 24)
  );

  // No action needed if same day
  if (daysDifference === 0) {
    return;
  }

  // Increment streak if next day
  if (daysDifference === 1) {
    user.streak.current += 1;
  } else if (daysDifference > 1) {
    // Reset streak if more than a day has passed
    user.streak.current = STREAK_MIN;
  }

  // Update highest streak if current exceeds it
  if (user.streak.current > user.streak.highest) {
    user.streak.highest = user.streak.current;
  }

  // Update last response time to now
  user.streak.lastResponseTime = now;

  // Save and return the updated user document
  const options: {
    session?: ClientSession;
  } = {};
  
  if (session) {
    options.session = session;
  }
  return user.save(options);
};
