import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Job } from './job.entity';
import { Moderator } from './moderator.entity';
import { Admin } from './admin.entity';
import { Student } from './student.entity';
import { Comment } from './comment.entity';
import { Report } from './report.entity';
import { Offer } from './offer.entity';
import { StudentHr } from './student_hr.entity';
import { HrProfile } from './hrProfile.entity';

@Entity('Hr')
export class Hr {
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
  @Column()
  createdDate: Date;
  @Column()
  updatedDate: Date;

  @Column({ nullable: true })
  profileImg: string;
  @Column()
  password: string;

  @ManyToOne(() => Moderator, (moderator) => moderator.students)
  createdByModerator: number;

  @ManyToOne(() => Admin, (admin) => admin.students)
  createdByAdmin: number;

  @OneToMany(() => Job, (moderator) => moderator.hr)
  jobs: Job[];

  @OneToMany(() => Comment, (comment) => comment.hr)
  comments: Comment[];

  @OneToMany(() => Report, (report) => report.hr)
  reports: Report[];

  @OneToMany(() => Offer, (offer) => offer.hr)
  letters: Offer[];

  // @ManyToMany(() => Student, (student) => student.connectionS)
  // connectionH: Student[];

  @OneToMany(() => StudentHr, (sh) => sh.hr)
  sthr: Student[];

  @OneToOne(() => HrProfile, (hrProfile) => hrProfile.hr)
  hrProfile: HrProfile;
}
