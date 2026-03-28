
import { JwtPayload } from "jsonwebtoken";


export interface SessionTokenPayload extends JwtPayload {
  myId: string;
}