import jwt from "jsonwebtoken";
import { IUser } from "../models/User.model";

interface TokenInput {
  _id: string;
  email: string;
  userId: string;
}
class JwtService {
  private readonly secretKey: string;

  constructor(secretKey?: string) {
    this.secretKey = secretKey || "tms@2024";
  }

  generateToken(user: Partial<TokenInput>): string {
    const options: jwt.SignOptions = {
      expiresIn: "1h",
    };

    return jwt.sign(user, this.secretKey, options);
  }

  verifyToken(token: string): IUser | null {
    try {
      const decoded = jwt.verify(token, this.secretKey) as {
        userId: string;
        username: string;
      };

      const user: IUser | null =
        /* Fetch user from the database using decoded.userId */ null;

      return user;
    } catch (error) {
      return null;
    }
  }
}

export default JwtService;
