import { Request, Response } from "express";
import { createQueryBuilder } from "typeorm";
import { Todo } from "../entites/Todo";
import User from "../entites/User";
import TodoRepository from "../repositories/TodoRepository";
class TodoController {
  getAll = async (req: Request, res: Response) => {
    try {
      const [todos, todosCount] = await Todo.findAndCount({
        relations: ["user"],
      });
      res.send({
        todos,
        todosCount,
      });
    } catch (e) {
      res.status(404).send({ message: e.message });
    }
  };
  show = async (req: Request, res: Response) => {
    try {
      const todoID: number = parseInt(req.params.id);
      const todo = await TodoRepository.find(todoID);
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
    await Todo.create(data)
      .save()
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
