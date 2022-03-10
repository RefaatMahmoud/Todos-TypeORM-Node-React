import { Application, Request, Response } from "express";
import { TodoRoutes } from "../../routes/TodoRoutes";
import { UserRoutes } from "../../routes/UserRoutes";
const loadAppRoutes = (app: Application) => {
  app.use(TodoRoutes);
  app.use(UserRoutes);
  app.get("/", (req: Request, res: Response): void => {
    res.send("Hello Typescript with Node.js!");
  });
};
export { loadAppRoutes };
