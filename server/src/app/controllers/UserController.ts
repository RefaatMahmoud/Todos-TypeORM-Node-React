import User from "../entites/User";
import { Request, Response } from "express";

//TODO need to apply enhancement as TodoController [apply validation schema , use repository]
class UserController {
  getAll = async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (e) {
      res.status(404).send({ message: e.message });
    }
  };
  store = async (req: Request, res: Response): Promise<void> => {
    const data = {
      name: req.body.name,
    };
    await User.create(data)
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating user.",
        });
      });
  };
  update = async (req: Request, res: Response): Promise<void> => {
    const data = {
      name: req.body.name,
    };
    const userID = req.params.id;
    await User.update(userID, data)
      .then(() => {
        res.send({
          message: "updated successfully",
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while updating user.",
        });
      });
  };
  delete = async (req: Request, res: Response): Promise<void> => {
    const userID: number = parseInt(req.params.id);
    await User.findOne(userID).then((data) => {
      if (!data) {
        res.status(400).send({ message: "user is not exists" });
      }
      User.delete(userID)
        .then(() => {
          res.send({
            message: "deleted successfully",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occurred while deleting user.",
          });
        });
    });
  };
}
export default new UserController();
