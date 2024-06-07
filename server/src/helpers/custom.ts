import { Request } from 'express';
import {
  RequestWithSessionDetails,
  TokenOutput,
} from '../interfaces/Custum.inteface';
import { Types } from 'mongoose';

class Custom {
  static getSessionDetails(req: Request): TokenOutput {
    const userDetails = (req as unknown as RequestWithSessionDetails)
      .sessionDetails;
    return userDetails;
  }
  static toObjectId(id: string): Types.ObjectId {
    return new Types.ObjectId(id);
  }
  static waitFiveSeconds() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Operation completed after 5 seconds');
      }, 5000);
    });
  }
}

export default Custom;
