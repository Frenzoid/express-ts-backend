import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class UploadedFile {
  constructor(upfile: UploadedFile | string) {
    if (upfile && typeof upfile !== 'string') {
      this.path = upfile.path;
      if (upfile.ext) this.ext = upfile.ext;
      if (upfile.size)  this.size = upfile.size;
    } else { this.path = upfile as string; }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  path: string;

  @Column('text', { default: 'unknown' })
  ext: string;

  @Column('text', { default: 'unknown' })
  size: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;
}