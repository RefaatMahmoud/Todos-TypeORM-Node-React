import { body } from "express-validator";
import User from "../../../app/entites/User";

const validations = [
  body("title").notEmpty().withMessage("title can't be empty"),
  body("user_id").custom((value: number) => {
    return User.findOne({ id: value }).then((user) => {
      if (!user) {
        return Promise.reject("user id is invalid");
      }
    });
  }),
];

export { validations as CreateTodoValidationSchema };
