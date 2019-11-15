import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Tag } from './Tag';
import { DbConnector } from '../config/dbcon';

@Entity()
export class User {
  constructor(userdata: User) {
    if (userdata) {
      this.nickname = userdata.nickname;
      this.name = userdata.name;
      this.tags = [];
    }
  }

  update(userdata) {
    if (userdata.nickname)
      this.nickname = userdata.nickname;

    if (userdata.name)
      this.name = userdata.name;
  }

  suspend() {
    this.deleted = true;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  nickname: string;

  @Column('text')
  name: string;

  @Column('bool', { default: false })
  deleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;

  @ManyToMany(type => Tag, tag => tag.users)
  @JoinTable()
  tags: Tag[];
}