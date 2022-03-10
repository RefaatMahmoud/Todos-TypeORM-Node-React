import * as dotenv from "dotenv";
import { Application } from "express";
import { loadAppMidlewares } from "../../app/providers/middlewareServiceProvider";
import { loadAppRoutes } from "../../app/providers/routeServiceProvider";
import { connectToDB } from "../../database/connection";
const loadApp = (app: Application) => {
  dotenv.config();
  if (!process.env.PORT) {
    process.exit(1);
  }
  loadAppMidlewares(app);
  loadAppRoutes(app);
  connectToDB();
};
export { loadApp };
