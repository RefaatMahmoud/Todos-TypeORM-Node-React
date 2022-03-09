import { Request, Response } from "express";
import { Todo } from "../entites/Todo";
import User from "../entites/User";
import TodoRepository from "../repositories/TodoRepository";
class TodoController {
  getAll = async (req: Request, res: Response) => {
    try {
      const [todos, count] = await TodoRepository.getAll();
      res.send({
        todos,
        count,
      });
    } catch (e) {
      res.status(404).send({ message: e.message });
    }
  };
  show = async (req: Request, res: Response) => {
    try {
      const todoId: Number = parseInt(req.params.id);
      const todo = await TodoRepository.find(todoId);
      res.send(todo);
    } catch (e) {
      res.status(404).send({ message: e.message });
    }
  };
  store = async (req: Request, res: Response) => {
    const data = {
      title: req.body.title,
      description: req.body.description,
      is_active: req.body?.is_active || true,
      user: await User.findOne(req.body.user_id),
    };
    await TodoRepository.store(data)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message || "Some error occurred while creating todo.",
        });
      });
  };
  update = async (req: Request, res: Response): Promise<void> => {
    const data = {
      title: req.body.title,
      description: req.body.description,
      is_active: req.body?.is_active || true,
      user: await User.findOne(req.body.user_id),
    };
    const todoID = parseInt(req.params.id);
    await TodoRepository.update(todoID, data)
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
    await TodoRepository.isExists(todoID).then((data) => {
      if (!data) {
        res.status(400).send({ message: "todo is not exists" });
      }
      TodoRepository.delete(todoID)
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
