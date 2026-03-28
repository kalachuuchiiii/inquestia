import cloudinary from "@/config/cloudinary";
import User from "@/models/user/user";
import { ObjectIdSchema } from "@/schemas";
import { UserService } from "@/services";
import {
  BadRequestError,
  NotFoundError,
} from "@/utils/customErrorClass";
import { getNextPage } from "@/utils/getNextPage";
import {
  AvatarSizeSchema,
  AvatarTypeSchema,
  BioSchema,
  InterestListSchema,
  IsDraftSchema,
  NicknameSchema,
  QueryParamParser,
  SocialLinkListSchema,
  UsernameSchema,
} from "@inquestia/schemas";
import {
  GetLeaderboardResponse,
  GetOwnedSurveysResponse,
  GetSurveysSharedToMeResponse,
  GetUserByUsernameResponse,
  GetUserSurveysReponse,
  GetUsersWithSimilarInterestsResponse,
  UpdateInterestResponse,
  UpdateMyAvatarResponse,
} from "@inquestia/types";
import { RequestHandler } from "express";
import z from "zod";

const userService = new UserService();

export class UserController {

  searchUsers: RequestHandler = async(req, res) => {
    const query = z.string().min(1).parse(req.query.q);
    const { skip, limit, page } = QueryParamParser.parse(req.query);
    const userQuery = { $or: [
      { username: { $regex: query, $options: "i" } },
      { nickname: { $regex: query, $options: "i" } } 
      ]};

    const [users, totalUsers] = await Promise.all([
      User.find(userQuery).skip(skip).limit(limit).lean(),
      User.countDocuments(userQuery)
    ])

    const nextPage = getNextPage({ page, limit, totalResources: totalUsers });

    return res.status(200).json({
      success: true,
      users: users.map((u) => new User(u).getSafeDetails()),
      totalUsers,
      nextPage
    })
  }


  getLeaderboards: RequestHandler = async(req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    
    const leaderboard = await userService.getLeaderboards();
    const response: GetLeaderboardResponse = {
      leaderboard,
      message: '',
      success: true
    };
    return res.status(200).json(response)
  }

  getUserSurveys: RequestHandler = async (req, res) => {
    const { skip, page, limit } = QueryParamParser.parse(req.query);
    const userId = ObjectIdSchema.parse(req.params.userId);

    const { surveys, totalSurveys, nextPage } =
      await userService.getUserSurveys({ skip, page, limit, userId });
    const response: GetUserSurveysReponse = {
      surveys,
      totalSurveys,
      nextPage,
      success: true,
    };

    return res.status(200).json(response);
  };

  updateMySocialLinks: RequestHandler = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const socialLinks = SocialLinkListSchema.parse(req.body.socialLinks);

    await userService.updateMySocialLinks({ myId, socialLinks });
    return res.status(200).json({
      success: true,
      message: "Your social links was updated!",
    });
  };

  updateMyAvatar: RequestHandler = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const file = req.file;
    if (!file) {
      throw new NotFoundError("File not found.", "FILE_NOT_FOUND");
    }

    AvatarTypeSchema.parse(file.mimetype);
    AvatarSizeSchema.parse(file.size);

    const avatar = file.buffer.toString("base64");
    const filePath = `data:${file.mimetype};base64,${avatar}`;

    const avatarUrl = await userService.updateMyAvatar({ filePath, myId });
    const response: UpdateMyAvatarResponse = {
      success: true,
      avatarUrl,
      message: "Your avatar was updated!",
    };
    return res.status(200).json(response);
  };

  updateMyBio: RequestHandler = async (req, res) => {
    const bio = BioSchema.parse(req.body.bio);
    const myId = ObjectIdSchema.parse(req.myId);
    const data = await userService.updateMyBio({ bio, myId });
    return res.status(200).json({
      success: true,
      message: "Your bio was updated!",
    });
  };

  updateMyNickname: RequestHandler = async (req, res) => {
    const nickname = NicknameSchema.parse(req.body.nickname);
    const myId = ObjectIdSchema.parse(req.myId);
    const data = await userService.updateMyNickname({ nickname, myId });
    return res.status(200).json({
      success: true,
      message: "Your nickname was updated!",
    });
  };

  updateMyUsername: RequestHandler = async (req, res) => {
    const username = UsernameSchema.parse(req.body.username);
    const myId = ObjectIdSchema.parse(req.myId);
    const data = await userService.updateMyUsername({ username, myId });
    return res.status(200).json({
      success: true,
      message: "Your username was updated!",
    });
  };

  getSurveysSharedToMe: RequestHandler = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const { skip, page, limit } = QueryParamParser.parse(req.query);

    const { sharedSurveys, totalSharedSurveys, nextPage } =
      await userService.getSurveysSharedToMe({ myId, skip, page, limit });
    const response: GetSurveysSharedToMeResponse = {
      sharedSurveys,
      totalSharedSurveys,
      nextPage,
      success: true,
    };

    return res.status(200).json(response);
  };
  getMySurveys: RequestHandler = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const { skip, page, limit } = QueryParamParser.parse(req.query);
    const isDraft = IsDraftSchema.parse(req.query.isDraft);

    const { surveys, nextPage, totalSurveys } = await userService.getMySurveys({
      myId,
      skip,
      page,
      limit,
      isDraft,
    });
    const response: GetOwnedSurveysResponse = {
      surveys,
      nextPage,
      totalSurveys,
      success: true,
    };

    return res.status(200).json(response);
  };

  getUserByUsername: RequestHandler = async (req, res) => {
    const username = UsernameSchema.parse(req.params.username);
    const user = await userService.getUserProfileByUsername(username);

    const response: GetUserByUsernameResponse = {
      user: user,
      success: true,
    };

    return res.status(200).json(response);
  };

  updateUserInterests: RequestHandler = async (req, res) => {
    const interests = InterestListSchema.parse(req.body.interests);
    const myId = ObjectIdSchema.parse(req.myId);
    const data = await userService.updateUserInterests({ myId, interests });
    const response: UpdateInterestResponse = {
      success: true,
      interests: data.interests,
      message: "Interests updated successfully!",
    };
    return res.status(200).json(response);
  };

  getUsersWithSimilarInterests: RequestHandler = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const { users } = await userService.getUsersWithSimilarInterests({
      myId,
    });
    const response: GetUsersWithSimilarInterestsResponse = {
      users,
      success: true,
    };
    return res.status(200).json(response);
  };
}
