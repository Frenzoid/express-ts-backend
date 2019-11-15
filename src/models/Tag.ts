import { Entity, PrimaryColumn, JoinTable, ManyToMany } from 'typeorm';
import { User } from './User';

@Entity()
export class Tag {
  constructor(name: string) {
    this.name = name;
  }

  @PrimaryColumn('text')
  name: string;

  @ManyToMany(type => User, user => user.tags)
  @JoinTable()
  users: User[];
}