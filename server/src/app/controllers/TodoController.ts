import { Todo } from "../entites/Todo";
import { Request, Response } from "express";
class TodoController {
  getAll = async (req: Request, res: Response) => {
    try {
      const todos = await Todo.find();
      res.send(todos);
    } catch (e) {
      res.status(404).send({ message: e.message });
    }
  };
  store = async (req: Request, res: Response): Promise<void> => {
    const data = {
      title: req.body.title,
      description: req.body.description,
      is_active: req.body?.is_active || true,
    };
    await Todo.create(data)
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating todo.",
        });
      });
  };
  update = async (req: Request, res: Response): Promise<void> => {
    const data = {
      title: req.body.title,
      description: req.body.description,
      is_active: req.body?.is_active || true,
    };
    const todoID = req.params.id;
    await Todo.update(todoID, data)
      .then(() => {
        res.send({
          message: "updated successfully",
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while updating todo.",
        });
      });
  };
  delete = async (req: Request, res: Response): Promise<void> => {
    const todoID: number = parseInt(req.params.id);
    await Todo.findOne(todoID).then((data) => {
      if (!data) {
        res.status(400).send({ message: "todo is not exists" });
      }
      Todo.delete(todoID)
        .then(() => {
          res.send({
            message: "deleted successfully",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occurred while deleting todo.",
          });
        });
    });
  };
}
export default new TodoController();