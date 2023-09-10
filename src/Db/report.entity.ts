import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Hr } from './hiring.entity';
import { Student } from './student.entity';
import { Post } from './post.entity';
import { Job } from './job.entity';
import { Moderator } from './moderator.entity';

@Entity('Report')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  details: string;
  @Column()
  createdDate: Date;
  //
  @ManyToOne(() => Hr, (hr) => hr.reports)
  hr: number;
  //
  @ManyToOne(() => Student, (student) => student.reports)
  student: number;
  //
  // @ManyToOne(() => Post, (post) => post.reports)
  // post: number;
  //
  // @ManyToOne(() => Job, (job) => job.reports)
  // job: number;
  //
  @ManyToOne(() => Moderator, (moderator) => moderator.handledReports)
  handledBy: number;
}
