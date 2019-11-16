import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class UploadedFile {
  constructor(upfile: UploadedFile) {
    if (upfile) {
      this.externalPath = upfile.externalPath;
      this.internalPath = upfile.internalPath;
      if (upfile.ext) this.ext = upfile.ext;
      if (upfile.size)  this.size = upfile.size;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  externalPath: string;

  @Column('text')
  internalPath: string;

  @Column('text', { default: 'unknown' })
  ext: string;

  @Column('text', { default: 'unknown' })
  size: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;
}