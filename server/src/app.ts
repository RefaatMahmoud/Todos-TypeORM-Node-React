import express, { Request, Response, Application } from "express";

const app: Application = express();

const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello Typescript with Node.js!");
});

app.listen(port, (): void => {
  console.log(`Server Running https://localhost:${port} 🚀`);
});
