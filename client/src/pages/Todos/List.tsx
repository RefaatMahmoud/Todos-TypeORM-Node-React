import { createContext, Key, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TodoTable from "../../components/Todos/Table";
import TodoService from "../../services/TodoService";
import { todoItemType } from "../../types/common";
export const TodoContext = createContext({});
const todoServiceInstance = new TodoService();

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

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
    <TodoContext.Provider
      value={{
        todos,
        deleteTodo,
      }}
    >
      <div className="container mt-5">
        <Link to={"/todo/create"} className="btn btn-primary pull-right">
          Create Todo
        </Link>
        {!todos && <div>Loading ..</div>}
        {todos && <TodoTable />}
      </div>
    </TodoContext.Provider>
  );
};

export default ListTodo;
