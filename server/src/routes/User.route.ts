import express, { Router } from 'express';
import UserController from '../controllers/User.controller';
const router: Router = express.Router();
import AuthMiddleware from '../middlewares/Auth.middleware';

router
  .route('/register')
  .post(
    AuthMiddleware.isAuth,
    AuthMiddleware.roleAuthMiddleware(['company']),
    UserController.registerUser
  );

router
  .route('/users-list')
  .get(
    AuthMiddleware.isAuth,
    AuthMiddleware.roleAuthMiddleware(['company', 'manager']),
    UserController.getCompanyUsers
  );

router.get(
  '/own-profile',
  AuthMiddleware.isAuth,
  AuthMiddleware.roleAuthMiddleware([
    'manager',
    'admin',
    'employee',
    'teamlead',
  ]),
  UserController.ownDetails
);

router.get(
  '/filtered-users',
  AuthMiddleware.isAuth,
  AuthMiddleware.roleAuthMiddleware(['company', 'manager']),
  UserController.filteredCompanyUser
);

router
  .route('/:userId')
  .get(
    AuthMiddleware.isAuth,
    AuthMiddleware.roleAuthMiddleware(['company']),
    UserController.userDetails
  )
  .patch(
    AuthMiddleware.isAuth,
    AuthMiddleware.roleAuthMiddleware(['company', 'employee']),
    UserController.updateProfile
  );

export default router;
