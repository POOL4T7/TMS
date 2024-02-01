import { NextFunction, Response } from "express";
import TokenService from "../services/Token.service";

class Auth {
  private Token: TokenService;
  constructor() {
    this.Token = new TokenService("");
    this.isAuth = this.isAuth.bind(this);
  }
  async isAuth(req: any, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      let token: string =
        req.headers["x-access-token"] || req.headers["authorization"] || "";
      const checkBearer = "Bearer ";
      if (token) {
        if (token?.startsWith(checkBearer)) {
          token = token.slice(checkBearer.length, token.length);
        }
        const user = this.Token.verifyToken(token);
        if (user) {
          req.sessionDetails = user;
          next();
        } else {
          return res.status(404).json({
            success: false,
            message: "invalid access token",
            error: "BAD REQUEST",
          });
        }
      } else {
      return  res.status(400).json({
          success: false,
          message: "Token not found",
        });
      }
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        success: true,
        message: "something went wrong, bad authentication",
        error: e.message,
      });
    }
  }
  roleAuthMiddleware(requiredRoles: string[]) {
    return (req: any, res: Response, next: NextFunction): Response | undefined => {
      const userRole: string = req?.sessionDetails?.role;
      if(!userRole){
         return res.status(404).json({error:"Invalid Role"});
         
      }
      const hasRequiredRole=requiredRoles.includes(userRole);

      if (hasRequiredRole) {
        next();
      } else {
        return res.status(403).json({ error: "Forbidden - Insufficient permissions" });
      }
    };
  }
}

export default new Auth();
