import { useCallback } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import TodoService from "../../services/TodoService";
import { todoItemType } from "../../types/common";
const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  const getAllTodos = useCallback(async () => {
    const { data } = await new TodoService().getList();
    setTodos(data.todos);
  }, []);

  useEffect(() => {
    getAllTodos();
  }, [getAllTodos]);

  return (
    <div className="container mt-5">
      <Link to={"/todo/create"} className="btn btn-primary pull-right">
        Create Todo
      </Link>
      {!todos && <div>Loading ..</div>}
      {todos && (
        <Table striped>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo: todoItemType) => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo?.user?.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ListTodo;
