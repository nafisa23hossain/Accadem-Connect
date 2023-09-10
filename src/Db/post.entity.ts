import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { Comment } from './comment.entity';
import { Report } from './report.entity';

@Entity('Post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  details: string;
  @Column()
  createdDate: Date;
  @Column()
  updatedDate: Date;

  //
  @ManyToOne(() => Student, (student) => student.posts, { onDelete: 'CASCADE' })
  student: number;

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments: Comment[];

  // @OneToMany(() => Report, (report) => report.post)
  // reports: Report[];
}
