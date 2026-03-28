import cloudinary from "@/config/cloudinary";
import { EntityHelper } from "@/helper";
import Survey, { SurveyModel } from "@/models/survey/survey";
import User from "@/models/user/user";
import { BadRequestError, NotFoundError } from "@/utils/customErrorClass";
import { executeAfterCooldown } from "@/utils/executeAfterCooldown";
import { getNextPage } from "@/utils/getNextPage";
import { Interest } from "@inquestia/constants";
import { QueryParam } from "@inquestia/schemas";
import { Types } from "mongoose";
import ms from "ms";

const helper = new EntityHelper<SurveyModel>(Survey);

export class UserService {

  getLeaderboards = async() => {
    const rankedUsers = await User.find().sort({ 'core.current': 'descending'}).limit(10);
    return rankedUsers.map((u) => new User(u).getSafeDetails());
  }
  
  getUserSurveys = async ({
    userId,
    limit,
    skip,
    page,
  }: {
    userId: string;
    limit: number;
    skip: number;
    page: number;
  }) => {
    const filterQuery = {
      authorId: userId,
      isDeleted: false,
      isTakendown: false,
      isClosed: false,
      isDraft: false,
    };

    const [user, surveys, totalSurveys] = await Promise.all([
      User.findById(userId).orFail(
        new NotFoundError("User not found.", "USER_NOT_FOUND")
      ),
      Survey.find(filterQuery).skip(skip).limit(limit),
      Survey.countDocuments(filterQuery),
    ]);

    const surveysWithAuthor = surveys.map((s) => ({
      ...s.getSafeDetails(),
      author: user.getSafeDetails(),
    }));

    const nextPage = getNextPage({ totalResources: totalSurveys, page, limit });

    return {
      surveys: surveysWithAuthor,
      totalSurveys,
      nextPage,
    };
  };

  updateMySocialLinks = async ({
    myId,
    socialLinks,
  }: {
    myId: string;
    socialLinks: string[];
  }) => {
    const user = await User.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    user.socialLinks = socialLinks;
    return await user.save();
  };

  updateMyAvatar = async ({
    myId,
    filePath,
  }: {
    myId: string;
    filePath: string;
  }) => {
    const user = await User.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    const { avatar_public_id } = user;
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      filePath,
      {
        resource_type: "image",
        folder: "avatars",
        transformation: [
          {
            width: 150,
            height: 150,
            crop: "fill",
            gravity: "auto",
          },
        ],
      }
    );

    if (avatar_public_id) {
      const result = await cloudinary.uploader.destroy(avatar_public_id);
    }
    user.avatar_public_id = public_id;
    user.avatar = secure_url;
    await user.save();
    return secure_url;
  };

  updateMyBio = async ({ myId, bio }: { myId: string; bio: string }) => {
    const user = await User.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    user.bio = bio;
    return (await user.save()).getSafeDetails();
  };

  updateMyUsername = async ({
    myId,
    username,
  }: {
    myId: string;
    username: string;
  }) => {

    const user = await User.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );

    const sevenDaysInMs = ms('7D');

    const updatedUser = await executeAfterCooldown(sevenDaysInMs, user.lastUsernameUpdate, async() => {
      user.username = username;
      user.lastUsernameUpdate = new Date();
      return (await user.save()).getSafeDetails();
    })
    if(!updatedUser){
      throw new BadRequestError('You can only update your username once every 7 days.', 'USERNAME_UPDATE_COOLDOWN');
    }
    return updatedUser;
  };

  updateMyNickname = async ({
    myId,
    nickname,
  }: {
    myId: string;
    nickname: string;
  }) => {
    const user = await User.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    user.nickname = nickname;
    return (await user.save()).getSafeDetails();
  };

  getUserProfileByUsername = async (username: string) => {
    const user = await User.findOne({ username }).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    return user.getSafeDetails();
  };

  getSurveysSharedToMe = async ({
    myId,
    page,
    limit,
    skip,
  }: { myId: string } & Omit<QueryParam, "sort">) => {
    const filterQuery = {
      authorizedViewers: {
        $in: [myId],
      },
      isClosed: false,
      isDeleted: false,
      isTakendown: false,
    };
    const user = await User.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    const [surveysSharedToMe, totalSharedSurveys] = await Promise.all([
      Survey.find(filterQuery).skip(skip).limit(limit).populate("authorId"),
      Survey.countDocuments(filterQuery),
    ]);

    const sharedSurveys = surveysSharedToMe.map((s) => ({
      ...s.getSafeDetails(),
      author: new User(s.authorId).getSafeDetails(),
    }));
    const nextPage = getNextPage({
      page,
      limit,
      totalResources: totalSharedSurveys,
    });
    return {
      sharedSurveys,
      totalSharedSurveys,
      nextPage,
    };
  };

  getMySurveys = async ({
    myId,
    limit,
    skip,
    page,
    isDraft,
  }: { myId: string; isDraft: boolean } & Omit<QueryParam, "sort">) => {
    const filterQuery = { authorId: myId, isDraft, isDeleted: false };
    const [matchedSurveys, totalSurveys] = await Promise.all([
      Survey.find(filterQuery).skip(skip).limit(limit),
      Survey.countDocuments(filterQuery),
    ]);
    const user = (
      await User.findById(myId).orFail(
        new NotFoundError("User not found.", "USER_NOT_FOUND")
      )
    ).getSafeDetails();

    const surveys = matchedSurveys.map((s) => ({
      ...s.getSafeDetails(),
      author: user,
    }));

    const nextPage = getNextPage({ page, limit, totalResources: totalSurveys });
    return {
      surveys,
      nextPage,
      totalSurveys,
    };
  };

  getUsersWithSimilarInterests = async ({ myId }: { myId: string }) => {
    const user = await User.findById(myId)
      .orFail(new NotFoundError("User not found.", "USER_NOT_FOUND"))
      .lean();
    const matchedUsers = await User.aggregate([
      { $match: { _id: { $ne: new Types.ObjectId(myId) } } },
      {
        $addFields: {
          commonInterests: { $setIntersection: ["$interests", user.interests] },
        },
      },
      {
        $match: { commonInterests: { $ne: [] } },
      },
      {
        $limit: 9
      },
    ]);

    const users = matchedUsers.map((u) => new User(u).getSafeDetails());
    return { users };
  };
  updateUserInterests = async ({
    myId,
    interests,
  }: {
    myId: string;
    interests: Interest[];
  }) => {
    const user = await User.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    user.isFinishedOnboarding = true;
    user.interests = interests;
    const data = await user.save();
    return data;
  };
}
