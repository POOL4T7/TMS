import jwt from "jsonwebtoken";

interface TokenInput {
  _id?: string;
  email?: string;
  userId?: string;
  role?:string;
}

interface TokenOutput{
  _id?:string;
  email?:string;
  userId?: string;
  role?:string;
}

class JwtService {
  private readonly secretKey: string;

  constructor(secretKey?: string) {
    this.secretKey = secretKey || "tms@2024";
  }

  generateToken(user: Partial<TokenInput>): string {
    const options: jwt.SignOptions = {
      expiresIn: "1d",
    };

    return jwt.sign(user, this.secretKey, options);
  }

  verifyToken(token: string): TokenOutput | null {
    try {
      const decoded = jwt.verify(token, this.secretKey) as Partial<TokenOutput>;
      return decoded;
    } catch (error) {
      return null;
    }
  }
}

export default JwtService;
