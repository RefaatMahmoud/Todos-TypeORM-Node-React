import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import TodoService from "../../services/TodoService";
import UserService from "../../services/UserService";
import { userType } from "../../types/common";

const CreateTodo = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    user_id: "",
  });
  const [users, setUsers] = useState([]);

  const getUsersDropdown = useCallback(async () => {
    const { data } = await new UserService().getList();
    setUsers(data);
  }, []);

  useEffect(() => {
    getUsersDropdown();
  }, [getUsersDropdown]);

  const addTodo = async (): Promise<void> => {
    try {
      await new TodoService().create(formState);
      navigate("/todos");
      toast.success("Todo is created successfully");
    } catch (e: any) {
      toast.error(
        e.response?.data?.message || "there a problem in todo creation "
      );
    }
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addTodo();
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
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="users">Users</Label>
          <Input
            id="users"
            name="user_id"
            type="select"
            onChange={(e) => bindingFieldsToFormState(e)}
            placeholder="choose"
            defaultValue=""
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

export default CreateTodo;
