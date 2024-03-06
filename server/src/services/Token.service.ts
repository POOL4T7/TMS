import jwt from "jsonwebtoken";
import { TokenInput, TokenOutput } from "../interfaces/Custum.inteface";

const secretKey = "tms@2024";
class JwtService {
  static generateToken(user: Partial<TokenInput>): string {
    const options: jwt.SignOptions = {
      expiresIn: "1d",
    };

    return jwt.sign(user, secretKey, options);
  }

  static verifyToken(token: string): TokenOutput | null {
    try {
      const decoded = jwt.verify(token, secretKey) as TokenOutput;
      return decoded;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
}

export default JwtService;
