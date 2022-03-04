import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Todo } from "./Todo";
import { Base } from "./utils/Base";

@Entity("users")
export default class User extends Base {
  @Column({
    type: "varchar",
    length: "20",
    nullable: false,
    unique: true,
  })
  name: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
