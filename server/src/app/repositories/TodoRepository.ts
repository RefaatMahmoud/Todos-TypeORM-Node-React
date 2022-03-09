import { createQueryBuilder } from "typeorm";
import { Todo } from "../entites/Todo";
import RepositoryBaseInterface from "../interfaces/RepositoryBaseInterface";
import BaseRepository from "./BaseRepository";

class TodoRepository extends BaseRepository implements RepositoryBaseInterface {
  getAll = async () => {
    const [todos, count] = await createQueryBuilder(Todo, "todos")
      .leftJoin("todos.user", "user")
      .select(["todos.id", "todos.title", "todos.description", "user.name"])
      .orderBy("todos.id", "DESC")
      .getManyAndCount();
    return [todos, count];
  };
  find = async (id: Number) => {
    const todo = await createQueryBuilder(Todo, "todos")
      .leftJoin("todos.user", "user")
      .select(["todos.id", "todos.title", "todos.description", "user.id"])
      .where("todos.id = :id", { id })
      .getOne();
    return todo;
  };
}

export default new TodoRepository(Todo, "todos");
