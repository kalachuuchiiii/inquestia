import type { ClientSession, HydratedDocument } from "mongoose";
import { STREAK_MIN } from "@inquestia/constants";
import type { IUser } from "@/models/index";

//mutates the user object

export const updateUserStreakIfNeeded = (user: HydratedDocument<IUser>) => {
  if (!user.streak) {
    return user;
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
    return user;
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

  return user;
};

export const givePointsAndUpdateStreakIfEligible = (
  pointsToAdd: number,
  user: HydratedDocument<IUser>
) => {
  if (user.core) {
    user.core.current += pointsToAdd;
    user.core.highest = Math.max(user.core.current, user.core.highest);
  }
  const mutatedUser = updateUserStreakIfNeeded(user);
  return mutatedUser;
};
