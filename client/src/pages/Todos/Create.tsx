import { Key, useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
const CreateTodo = () => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    user: "",
  });
  useEffect(() => {}, []);

  const addTodo = () => {};

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
          />
        </FormGroup>
        <FormGroup>
          <Label for="authors">Users</Label>
          <Input
            id="authors"
            name="authorId"
            type="select"
            onChange={(e) => bindingFieldsToFormState(e)}
            placeholder="choose"
            defaultValue=""
          >
            <option value="" disabled>
              Select your option
            </option>
            {/* {users &&
              users.map((user: userType) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))} */}
          </Input>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </div>
  );
};

export default CreateTodo;
