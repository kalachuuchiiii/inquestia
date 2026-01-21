import { ObjectIdSchema } from "@/schemas";
import { UserService } from "@/services";
import { InterestListSchema, UsernameSchema } from "@shared/schemas";
import {
  GetUserByUsernameResponse,
  GetUsersWithSimilarInterestsResponse,
  UpdateInterestResponse,
} from "@shared/types";
import { RequestHandler } from "express";

const userService = new UserService();

export class UserController {

 
  getUserByUsername: RequestHandler = async(req, res) => {
      const username = UsernameSchema.parse(req.params.username);
      const user = await userService.getUserByUsername(username);

      const response: GetUserByUsernameResponse = {
         userResult: user,
         success: true
      }

      return res.status(200).json(response)
      
  }

  updateUserInterests: RequestHandler = async (req, res) => {
    const interests = InterestListSchema.parse(req.body.interests);
    const userId = ObjectIdSchema.parse(req.userId);
    const data = await userService.updateUserInterests({ userId, interests });
    const response: UpdateInterestResponse = {
      success: true,
      interests: data.interests,
      message: "Interests updated successfully!",
    };
    return res.status(200).json(response);
  };

  getUsersWithSimilarInterests: RequestHandler = async (req, res) => {
    const userId = ObjectIdSchema.parse(req.userId);
    const { users } = await userService.getUsersWithSimilarInterests({
      userId,
    });
    const response: GetUsersWithSimilarInterestsResponse = {
      users,
      success: true,
    };
    return res.status(200).json(response);
  };
}
