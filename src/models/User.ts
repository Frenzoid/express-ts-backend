import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { Tag } from './Tag';
import { UploadedFile } from './UploadedFile';

@Entity()
export class User {
  constructor(userdata: User) {
    if (userdata) {
      this.nickname = userdata.nickname;
      this.name = userdata.name;
      this.tags = [];
    }
  }

  // Updates static data.
  update(userdata: User) {
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

  @JoinTable()
  avatar: UploadedFile;
}