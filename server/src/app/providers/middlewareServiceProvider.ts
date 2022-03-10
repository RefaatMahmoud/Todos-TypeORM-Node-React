import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
const loadAppMidlewares = (app: Application) => {
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
};
export { loadAppMidlewares };
