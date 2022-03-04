import "reflect-metadata";
import { Todo } from "../app/entites/Todo";
import User from "../app/entites/User";
import { createConnection } from "typeorm";
const connectToDB = async () => {
  await createConnection({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Todo, User],
    synchronize: true,
    logging: false,
  })
    .then((connection) => {
      console.log("connected with db successfully ✅");
    })
    .catch((error) => {
      console.log(error);
      throw new Error("unable to connect with db 👎");
    });
};
export { connectToDB };
