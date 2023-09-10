import {
  Column,
  Entity,
  JoinColumn,
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
import { Hr } from './hiring.entity';

@Entity('HrProfile')
export class HrProfile {
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
  updatedDate: Date;
  @OneToOne(() => Hr, (hr) => hr.hrProfile)
  @JoinColumn()
  hr: number;
}
