import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './student.entity';
import { Hr } from './hiring.entity';

@Entity('student_connection_s_hr')
export class StudentHr {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Student, (student) => student.sthr)
  student: Student;
  @ManyToOne(() => Hr, (hr) => hr.sthr)
  hr: Hr;
}
