// controllers/AuthController.ts

import { Request, Response } from "express";
import CompanyService from "../services/Company.service";
import TokenService from "../services/Token.service";

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
  // async userLogin(req:Request)
}

export default new CompanyController();
