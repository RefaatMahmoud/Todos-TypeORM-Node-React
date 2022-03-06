import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "reactstrap";
import { TodoContext } from "../../pages/Todos/List";
import { todoItemType } from "../../types/common";

const TodoTable = () => {
  const contextData: any = useContext(TodoContext);
  const navigate = useNavigate();
  return (
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
        {contextData.todos.map((todo: todoItemType) => (
          <tr key={todo.id}>
            <td>{todo.title}</td>
            <td>{todo.description}</td>
            <td>{todo?.user?.name}</td>
            <td>
              <FontAwesomeIcon
                icon={faPencil}
                className={"text-primary"}
                style={{ marginLeft: "15px", cursor: "pointer" }}
                onClick={() => navigate(`/todo/edit/${todo.id}`)}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faTrash}
                className="text-danger"
                style={{ marginLeft: "15px", cursor: "pointer" }}
                onClick={() => contextData.deleteTodo(todo.id)}
              ></FontAwesomeIcon>
            </td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TodoTable;
