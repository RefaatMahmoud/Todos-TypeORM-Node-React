import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("todos")
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
