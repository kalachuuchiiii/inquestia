
import { JwtPayload } from "jsonwebtoken";


export interface SessionTokenPayload extends JwtPayload {
  userId: string;
}