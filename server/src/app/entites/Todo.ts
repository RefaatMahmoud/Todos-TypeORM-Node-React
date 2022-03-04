import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import User from "./User";
import { Base } from "./utils/Base";

@Entity("todos")
export class Todo extends Base {
  @Column({
    type: "varchar",
    length: "20",
    nullable: false,
    unique: true,
  })
  title: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description: string;

  @Column({
    type: "boolean",
    default: true,
  })
  is_active: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({ name: "user_id" })
  user: User;
}
