import express from "express";
import TodoController from "../app/controllers/TodoController";
import errorHandler from "../app/middlewares/errorHandler";
import { CreateTodoValidationSchema } from "../app/validations/Todo/create";
import { UpdateTodoValidationSchema } from "../app/validations/Todo/update";

const router = express.Router();

router.get("/todo", TodoController.getAll);
router.get("/todo/:id", TodoController.show);
router.post(
  "/todo",
  CreateTodoValidationSchema,
  errorHandler,
  TodoController.store
);
router.put(
  "/todo/:id",
  UpdateTodoValidationSchema,
  errorHandler,
  TodoController.update
);
router.delete("/todo/:id", TodoController.delete);

export { router as TodoRoutes };
