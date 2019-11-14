import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  constructor(userdata) {
    if (userdata) {
      this.nickname = userdata.nickname;
      this.name = userdata.name;
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
  IdUser: number;

  @Column('text')
  nickname: string;

  @Column('text')
  name: string;

  @Column('bool', { default: false })
  deleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;

}