import { NextFunction, Response, Request } from "express";
import TokenService from "../services/Token.service";
import { RequestWithSessionDetails } from "../interfaces/Custum.inteface";

class Auth {
  constructor() {
    this.isAuth = this.isAuth.bind(this);
  }

  async isAuth(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      let token: string =
        (req as unknown as RequestWithSessionDetails).headers[
          "x-access-token"
        ] ||
        (req as unknown as RequestWithSessionDetails).headers["authorization"];
      const checkBearer = "Bearer ";
      if (token) {
        if (token?.startsWith(checkBearer)) {
          token = token.slice(checkBearer.length, token.length);
        }
        const user = TokenService.verifyToken(token);
        if (user) {
          (req as unknown as RequestWithSessionDetails).sessionDetails = user;
          next();
        } else {
          return res.status(401).json({
            success: false,
            message: "invalid access token, please login again",
            error: "BAD REQUEST",
            code: 401.1,
          });
        }
      } else {
        return res.status(400).json({
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
    return (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Response | undefined => {
      const userRole: string | undefined = (
        req as unknown as RequestWithSessionDetails
      )?.sessionDetails?.role;
      if (!userRole) {
        return res.status(404).json({ error: "Invalid Role" });
      }
      const hasRequiredRole = requiredRoles.includes(userRole);

      if (hasRequiredRole) {
        next();
      } else {
        return res
          .status(403)
          .json({ error: "Forbidden - Insufficient permissions" });
      }
    };
  }
}

export default new Auth();
