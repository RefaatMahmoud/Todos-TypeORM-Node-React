import { Key, useCallback } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import TodoService from "../../services/TodoService";
import { todoItemType } from "../../types/common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  const todoServiceInstance = new TodoService();
  const getAllTodos = useCallback(async () => {
    const { data } = await todoServiceInstance.getList();
    setTodos(data.todos);
  }, []);

  useEffect(() => {
    getAllTodos();
  }, [getAllTodos]);

  const deleteTodo = async (id: Key) => {
    if (window.confirm("Are you sure to delete that")) {
      await todoServiceInstance.remove(id);
      const updatedTodos = [...todos].filter(
        (todo: todoItemType) => todo.id !== id
      );
      setTodos(updatedTodos);
      toast.success("todo is deleted successfully");
    }
  };
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo: todoItemType) => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo?.user?.name}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faPencil}
                    className={"text-primary"}
                    style={{ marginLeft: "15px", cursor: "pointer" }}
                  ></FontAwesomeIcon>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-danger"
                    style={{ marginLeft: "15px", cursor: "pointer" }}
                    onClick={() => deleteTodo(todo.id)}
                  ></FontAwesomeIcon>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ListTodo;
