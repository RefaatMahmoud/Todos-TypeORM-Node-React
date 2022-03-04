//Modules
import express, { Request, Response, Application } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import "reflect-metadata";
import { connectToDB } from "./database/connection";
import { TodoRoutes } from "./routes/TodoRoutes";
import { UserRoutes } from "./routes/UserRoutes";

// App variables
dotenv.config();
if (!process.env.PORT) {
  process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string);
const app: Application = express();

//Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
//routes & handlers
app.use(TodoRoutes);
app.use(UserRoutes);

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello Typescript with Node.js!");
});

app.listen(PORT, (): void => {
  console.log(`Server Running https://localhost:${PORT} 🚀`);
});
connectToDB();
