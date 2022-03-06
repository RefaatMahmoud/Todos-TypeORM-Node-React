import { createQueryBuilder } from "typeorm";
import { Todo } from "../entites/Todo";

class TodoRepository {
  find = async (id: Number) => {
    const todo = await createQueryBuilder(Todo, "todos")
      .leftJoin("todos.user", "user")
      .select(["todos.id", "todos.title", "todos.description", "user.id"])
      .where("todos.id = :id", { id })
      .getOne();
    return todo;
  };
}

export default new TodoRepository();
