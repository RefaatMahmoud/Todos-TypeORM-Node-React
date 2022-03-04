import express from "express";
import TodoController from "../app/controllers/TodoController";

const router = express.Router();

router.get("/todo", TodoController.getAll);
router.get("/todo/:id", TodoController.show);
router.post("/todo", TodoController.store);
router.put("/todo/:id", TodoController.update);
router.delete("/todo/:id", TodoController.delete);

export { router as TodoRoutes };
