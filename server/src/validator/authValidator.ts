import { body } from "express-validator";

export const loginValidator = [
  body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters"),
];
export const companySignUpValidator = [
  body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters"),
  body("firstName")
    .isString()
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters"),
  body("lastName").isString().isLength({ min: 0 }),
];

export const emailLinkValidator = [
  body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
];
