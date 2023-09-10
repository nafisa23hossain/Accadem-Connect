import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './student.entity';
import { Job } from './job.entity';
import { Hr } from './hiring.entity';

@Entity('Offer')
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  letter: string;
  @Column()
  createdDate: Date;

  //
  @ManyToOne(() => Student, (student) => student.letters)
  student: number;
  @ManyToOne(() => Job, (job) => job.letters)
  job: number;
  @ManyToOne(() => Hr, (hr) => hr.letters)
  hr: number;
}
