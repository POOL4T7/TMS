import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/Auth.middleware';
import TaskController from '../controllers/Task.controller';
const TaskRouter: Router = express.Router();

TaskRouter.route('/')
  .post(
    AuthMiddleware.isAuth,
    AuthMiddleware.roleAuthMiddleware(['manager']),
    TaskController.addTask
  )
  .get(
    AuthMiddleware.isAuth,
    AuthMiddleware.roleAuthMiddleware([
      'company',
      'manager',
      'employee',
      'teamlead',
    ]),
    TaskController.getAssignedTaskList
  );

TaskRouter.route('/get-own-task').get(
  AuthMiddleware.isAuth,
  AuthMiddleware.roleAuthMiddleware(['manager']),
  TaskController.getOwnerTaskList
);

TaskRouter.route('/:taskId').post(
  AuthMiddleware.isAuth,
  AuthMiddleware.roleAuthMiddleware(['manager']),
  TaskController.updateTask
);

export default TaskRouter;
