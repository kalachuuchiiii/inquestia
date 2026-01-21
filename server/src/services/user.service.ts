import User from "@/models/user/user";
import { NotFoundError } from "@/utils/errors/customErrorClass";
import { Interest } from "@shared/types";

export class UserService {


  getUserByUsername = async(username: string) => {
    const user = await User.findOne({ username }).orFail(new NotFoundError('User not found.', 'USER_NOT_FOUND'));
    return user.getSafeDetails();
  }

  getUsersWithSimilarInterests = async ({ userId }: { userId: string }) => {
    const user = await User.findById(userId)
      .orFail(new NotFoundError("User not found.", "USER_NOT_FOUND"))
      .lean();
    const matchedUsers = await User.aggregate([
      { $match: { _id: { $ne: user._id } } },
      {
        $addFields: {
          commonInterests: { $setIntersection: ["$interests", user.interests] },
        },
      },
      {
        $match: { commonInterests: { $ne: [] } },
      },
      {
        $limit: 10,
      }
    ]);

    const users = matchedUsers.map((u) => new User(u).getSafeDetails());
    return { users };
  };
  updateUserInterests = async ({
    userId,
    interests,
  }: {
    userId: string;
    interests: Interest[];
  }) => {
    const user = await User.findById(userId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    user.isFinishedOnboarding = true;
    user.interests = interests;
    const data = await user.save();
    return data;
  };
}
