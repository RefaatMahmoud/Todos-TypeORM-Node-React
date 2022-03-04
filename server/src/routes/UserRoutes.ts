import express from "express";
import UserController from "../app/controllers/UserController";

const router = express.Router();

router.get("/user", UserController.getAll);
router.post("/user", UserController.store);
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.delete);

export { router as UserRoutes };
