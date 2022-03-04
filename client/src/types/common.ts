import { Key } from "react";

export type todoItemType = {
  id: Key;
  title: String;
  description: String;
  user: {
    name: String;
  };
};

export type userType = {
  id: Key;
  name: String;
};
