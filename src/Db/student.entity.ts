import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Moderator } from './moderator.entity';
import { Post } from './post.entity';
import { Admin } from './admin.entity';
import { Hr } from './hiring.entity';
import { Comment } from './comment.entity';
import { Offer } from './offer.entity';
import { Report } from './report.entity';
import { Job } from './job.entity';
import { StudentHr } from './student_hr.entity';
import { StudentProfile } from './studentProfile.entity';

@Entity('Student')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  age: string;
  @Column()
  phone: string;
  @Column()
  email: string;
  @Column()
  gender: string;
  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;

  @Column()
  profileImg: string;
  @Column()
  password: string;

  @ManyToOne(() => Job, (job) => job.students)
  job: number;

  @ManyToOne(() => Moderator, (moderator) => moderator.students)
  createdByModerator: number;

  @ManyToOne(() => Admin, (admin) => admin.students)
  createdByAdmin: number;

  @OneToMany(() => Post, (post) => post.student, { cascade: true })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.student, { cascade: true })
  comments: Comment[];

  @OneToMany(() => Offer, (offer) => offer.student)
  letters: Offer[];

  @OneToMany(() => Report, (report) => report.student)
  reports: Report[];

  // @ManyToMany(() => Hr, (hr) => hr.connectionH)
  // @JoinTable()
  // connectionS: Hr[];

  @OneToMany(() => StudentHr, (sh) => sh.student)
  sthr: Student[];

  @OneToOne(() => StudentProfile, (stdP) => stdP.student)
  studentProfile: StudentProfile;
}
