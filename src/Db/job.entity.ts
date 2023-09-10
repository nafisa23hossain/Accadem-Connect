import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hr } from './hiring.entity';
import { Offer } from './offer.entity';
import { Report } from './report.entity';
import { Student } from './student.entity';

@Entity('Job')
export class Job {
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

  @ManyToOne(() => Hr, (hr) => hr.jobs)
  hr: number;

  @OneToMany(() => Student, (student) => student.job)
  students: Student[];

  @OneToMany(() => Offer, (offer) => offer.job)
  letters: Offer[];

  // @OneToMany(() => Report, (report) => report.job)
  // reports: Report[];
}
