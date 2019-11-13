import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class User {
  constructor(userdata) {
    if (userdata) {
      this.nickname = userdata.nickname;
      this.name = userdata.name;
      this.deleted = false;
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

  @PrimaryColumn()
  IdUser: string;

  @Column()
  nickname: string;

  @Column()
  name: string;

  @Column()
  deleted: boolean;

}