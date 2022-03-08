import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import TodoService from "../../services/TodoService";
import UserService from "../../services/UserService";
import { userType } from "../../types/common";
const todoServiceInstance = new TodoService();
const userServiceInstance = new UserService();

const EditTodo = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    user: {
      id: "",
    },
  });
  const [users, setUsers] = useState([]);
  const getUsersDropdown = useCallback(async () => {
    const { data } = await userServiceInstance.getList();
    setUsers(data);
  }, []);
  const getTodoData = useCallback(async () => {
    const { data } = await todoServiceInstance.show(id);
    setFormState(data);
  }, []);

  useEffect(() => {
    getUsersDropdown();
    getTodoData();
  }, [getTodoData, getUsersDropdown]);

  const submitForm = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const body = prepareUpdateFormRequestData();
      await todoServiceInstance.update(id, body);
      navigate("/todos");
      toast.success("Todo is updated successfully");
    } catch (e: any) {
      toast.error(
        e.response?.data?.message || "there a problem in todo creation "
      );
    }
  };

  const prepareUpdateFormRequestData = () => {
    return {
      title: formState.title,
      description: formState.description,
      user_id: formState.user,
    };
  };

  const bindingFieldsToFormState = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setFormState({
      ...formState,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <div className="container mt-5">
      <Form onSubmit={(e) => submitForm(e)}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="todo title"
            type="text"
            onChange={(e) => bindingFieldsToFormState(e)}
            defaultValue={formState.title}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            id="description"
            name="description"
            placeholder="todo description"
            type="textarea"
            onChange={(e) => bindingFieldsToFormState(e)}
            defaultValue={formState.description}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="users">Users</Label>
          <Input
            id="users"
            name="user"
            type="select"
            onChange={(e) => bindingFieldsToFormState(e)}
            placeholder="choose"
            value={formState.user.id}
            required
          >
            <option value="" disabled>
              Select your option
            </option>
            {users &&
              users.map((user: userType) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
          </Input>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </div>
  );
};

export default EditTodo;
