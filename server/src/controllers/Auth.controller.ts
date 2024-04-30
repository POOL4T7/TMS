// controllers/AuthController.ts

import { Request, Response } from "express";
import CompanyService from "../services/Company.service";
import TokenService from "../services/Token.service";
import UserService from "../services/User.service";
import EmailService from "../services/Email.service";
import { UserCompany } from "../interfaces/User.interface";
import BcryptJs from "bcryptjs";

// const waitFiveSeconds = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("Operation completed after 5 seconds");
//     }, 5000);
//   });
// };

class CompanyController {
  constructor() {
    this.createCompany = this.createCompany.bind(this);
    this.companyLogin = this.companyLogin.bind(this);
  }

  async createCompany(req: Request, res: Response): Promise<Response> {
    try {
      // const domain = req.body.email.split("@")[1];
      // integrate the domain verification
      const body = {
        name: req.body.name,
        industry: req.body.industry,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        status: req.body.status,
      };
      const company = await CompanyService.create(body);
      company.password = "";
      const accessToken = TokenService.generateToken({
        email: body.email,
        _id: company._id?.toString(),
        role: "company",
        companyId: company._id?.toString(),
      });
      return res.status(201).json({
        success: true,
        data: {
          accessToken: accessToken,
          type: "company",
          status: company.status,
        },
        message: "New Company created",
      });
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: "server error",
      });
    }
  }
  async companyLogin(req: Request, res: Response): Promise<Response> {
    try {
      // await waitFiveSeconds();
      const company = await CompanyService.findOne({ email: req.body.email });
      if (!company) {
        return res.status(404).json({
          success: false,
          messsage: "invalid credentials",
        });
      }
      const accessToken = TokenService.generateToken({
        email: company.email,
        _id: company._id?.toString(),
        role: "company",
        companyId: company._id?.toString(),
      });
      return res.status(201).json({
        success: true,
        data: {
          accessToken: accessToken,
          type: "company",
          status: company.status,
        },
        message: "loggedin as a company",
      });
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: "server error",
      });
    }
  }
  async userLogin(req: Request, res: Response): Promise<Response> {
    try {
      // await waitFiveSeconds();
      const user = await UserService.findOne({ email: req.body.email }, "");
      if (!user) {
        return res.status(404).json({
          success: false,
          messsage: "invalid credentials",
        });
      }
      const accessToken = TokenService.generateToken({
        email: user.email,
        _id: user._id?.toString(),
        role: user.role,
        userId: user._id?.toString(),
      });
      return res.status(201).json({
        success: true,
        data: {
          accessToken: accessToken,
          type: user.role,
          status: user.status,
        },
      });
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: "server error",
      });
    }
  }
  async login(req: Request, res: Response): Promise<Response> {
    try {
      // await waitFiveSeconds();
      let user, role, accessToken;
      user = await UserService.findOne({ email: req.body.email }, "");
      role = user?.role || "user";
      if (user) {
        accessToken = TokenService.generateToken({
          email: user.email,
          _id: user._id?.toString(),
          role: role,
          companyId: (user.companyId as UserCompany)?._id?.toString(),
        });
      } else {
        user = await CompanyService.findOne({ email: req.body.email });
        role = "company";
        if (!user) {
          return res.status(404).json({
            success: false,
            messsage: "invalid credentials",
          });
        }
        accessToken = TokenService.generateToken({
          email: user.email,
          _id: user._id?.toString(),
          role: role,
          companyId: user._id?.toString(),
        });
      }
      if (await BcryptJs.compare(req.body.password, user!.password!)) {
        return res.status(200).json({
          success: true,
          data: {
            accessToken: accessToken,
            type: role,
            status: user.status,
          },
          message: "successfully logged-In",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "invalid credentials",
        });
      }
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: "server error",
      });
    }
  }

  async sendLink(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body;
      const isExists = await UserService.findOne({ email, status: "active" });
      if (isExists) {
        const token = TokenService.generateToken({ email });
        const subject = "Reset Password Link";
        const textPart = `Dear ${isExists?.firstName}, don't worry we are here.`;
        const link = `${process.env.WEB_URL}/reset-password?token=${token}`;
        const html = `Please click on link for reset password <br/><br/> ${link}`;
        await EmailService.sendEmail(email, subject, textPart, html);

        return res.status(200).json({
          success: true,
          message: "Email is sended to your registred email",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: "server error",
      });
    }
  }

  // -----------------------------DS-----------------------------

  async sendResetToken(req: Request, res: Response): Promise<Response> {
    try {
      const {email} = req.body;
      
      let user, resetToken;
      resetToken = Math.random().toString(36).substring(2,8);
      // mail info
      user = await UserService.findOne({ email } , "");
      let updatedUser;
      if(user){
        updatedUser = await UserService.updateUser({_id : user._id?.toString()} , {resetToken})
        console.log(updatedUser);
      }
      else {
        user = await CompanyService.findOne({ email });
        if(!user) return res.status(404).json({ message: 'User not found' });
        updatedUser = await CompanyService.updateCompany({_id : user._id?.toString()} , {resetToken});
        console.log(updatedUser);
      }
      
      const recipient = email;
      const subject = "Action Required: Reset Your Password";
      const textPart = `To reset your password, click on this link: ${process.env.WEB_URL}/auth/reset-password?resetToken=${resetToken}`
      await EmailService.sendEmail(recipient, subject, textPart, "");
      return res.status(200).json({message: 'Password reset link sent successfully'});

    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: "server error",
      });
    }
  }

  async resetPassword(req: Request, res: Response): Promise<Response> {
    try {
      const {email , newPassword} = req.body;
      const resetToken = req.query.resetToken as string;
      let user , updatedUser;
      user = await UserService.findOne({ resetToken } , "");
      if(user){
        updatedUser = await UserService.updatePassword({email} , {password : newPassword , resetToken : undefined});
      }
      else {
        user = await CompanyService.findOne({resetToken});
        if (!user) {
          return res.status(404).json({ message: 'Invalid or expired token' });
        }
        updatedUser = await CompanyService.updatePassword({email} , {password : newPassword , resetToken : undefined});
      }

      return res.status(200).json({ updatedUser , message: 'Password reset successful' });

    } catch (e: any) {
      return res.status(500).json({
        success: false,
        error: e.message,
        message: "server error",
      });
    }
  }
}

export default new CompanyController();
