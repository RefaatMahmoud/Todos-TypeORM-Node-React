import "reflect-metadata";
import { createConnection } from "typeorm";
import { Todo } from "../app/entites/Todo";
const connectToDB = async () => {
  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "123456",
    database: "todos-db",
    entities: [Todo],
    synchronize: true,
    logging: false,
  })
    .then((connection) => {
      console.log("connected with db successfully ✅");
    })
    .catch((error) => {
      console.log(error)
      throw new Error("unable to connect with db 👎");
    });
};
export { connectToDB };
