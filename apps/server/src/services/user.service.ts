import cloudinary from "@/config/cloudinary";
import { EntityHelper } from "@/helper";
import Survey from "@/models/survey/survey";
import User from "@/models/user/user";
import { BadRequestError, NotFoundError } from "@/utils/customErrorClass";
import { executeAfterCooldown } from "@/utils/executeAfterCooldown";
import { getNextPage } from "@/utils/getNextPage";
import { Interest, type SurveyStatus } from "@inquestia/constants";
import { QueryParam } from "@inquestia/schemas";
import { Types } from "mongoose";
import ms from "ms";
import z from "zod";

export class UserService {
  getLeaderboards = async () => {
    const rankedUsers = await User.find()
      .sort({ "core.current": "descending" })
      .limit(10);

    return rankedUsers;
  };

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

    const [surveys, totalSurveys] = await Promise.all([
      Survey.find(filterQuery).skip(skip).limit(limit).populate(["authorId"]),
      Survey.countDocuments(filterQuery),
    ]);

    const nextPage = getNextPage({ totalResources: totalSurveys, page, limit });

    return {
      surveys,
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
    const { avatarPublicId } = user;
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

    if (avatarPublicId) {
      await cloudinary.uploader.destroy(avatarPublicId);
    }
    user.avatarPublicId = public_id;
    user.avatar = secure_url;
    await user.save();
    return secure_url;
  };

  updateMyBio = async ({ myId, bio }: { myId: string; bio: string }) => {
    const user = await User.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    user.bio = bio;
    return await user.save();
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

    const sevenDaysInMs = ms("7D");

    const updatedUser = await executeAfterCooldown(
      sevenDaysInMs,
      user.lastUsernameUpdate,
      async () => {
        user.username = username;
        user.lastUsernameUpdate = new Date();
        return await user.save();
      }
    );
    if (!updatedUser) {
      throw new BadRequestError(
        "You can only update your username once every 7 days.",
        "USERNAME_UPDATE_COOLDOWN"
      );
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
    return await user.save();
  };

  getUserProfileByUsername = async (username: string) => {
    const user = await User.findOne({ username }).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    return user;
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
    const [surveys, totalSharedSurveys] = await Promise.all([
      Survey.find(filterQuery).skip(skip).limit(limit).populate("authorId"),
      Survey.countDocuments(filterQuery),
    ]);

    const nextPage = getNextPage({
      page,
      limit,
      totalResources: totalSharedSurveys,
    });
    return {
      surveys,
      totalSharedSurveys,
      nextPage,
    };
  };

  getMySurveys = async ({
    myId,
    limit,
    skip,
    status,
    page,
  }: { myId: string; status: SurveyStatus } & Omit<QueryParam, "sort">) => {
    const filterQuery = { authorId: myId, isDeleted: false, status };
    const [surveys, totalSurveys] = await Promise.all([
      Survey.find(filterQuery)
        .select("-authorizedViewers")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate(["authorId"]),
      Survey.countDocuments(filterQuery),
    ]);

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
    const users = await User.aggregate([
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
        $limit: 9,
      },
    ]);

    return users;
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
