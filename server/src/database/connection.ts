import "reflect-metadata";
import { Todo } from "../app/entites/Todo";
import User from "../app/entites/User";
import { createConnection } from "typeorm";
const connectToDB = async () => {
  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "123456",
    database: "todos-db",
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
