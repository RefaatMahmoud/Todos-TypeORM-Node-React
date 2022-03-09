import { createQueryBuilder, ObjectID } from "typeorm";
import { Todo } from "../entites/Todo";

class TodoRepository {
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
  store = async (data: {}) => await Todo.create(data).save();
  update = async (id: number, data: {}) => await Todo.update(id, data);
  delete = async (id: number) => await Todo.delete(id);
  isExists = async (id: number) => {
    return await createQueryBuilder(Todo, "todos")
      .where("todos.id = :id", {
        id,
      })
      .getCount();
  };
}

export default new TodoRepository();
