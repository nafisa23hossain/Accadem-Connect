import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { Hr } from './hiring.entity';
import { Student } from './student.entity';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  text: string;
  @CreateDateColumn()
  createdDate: Date;

  //
  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  post: number;
  //
  @ManyToOne(() => Hr, (hr) => hr.comments)
  hr: number;
  //
  @ManyToOne(() => Student, (student) => student.comments, {
    onDelete: 'CASCADE',
  })
  student: number;
  //

  @ManyToOne(() => Comment, (comment) => comment.childComments, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parentComment: number;

  @OneToMany(() => Comment, (comment) => comment.parentComment, {
    cascade: true,
  })
  childComments: Comment[];
}
