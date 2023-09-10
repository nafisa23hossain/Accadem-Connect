import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Admin } from './admin.entity';
import { Student } from './student.entity';
import { Hr } from './hiring.entity';
import { Report } from './report.entity';
import { ModeratorProfile } from './moderatorProfile.dto';

@Entity('Moderator')
export class Moderator {
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
  @Column()
  education: string;
  @Column()
  profileImg: string;
  @Column()
  password: string;
  @Column()
  status: string;

  @ManyToOne(() => Admin, (admin) => admin.moderators)
  createdBy: number;

  @OneToMany(() => Student, (student) => student.createdByModerator)
  students: Student[];

  @OneToMany(() => Hr, (hr) => hr.createdByModerator)
  hrs: Hr[];

  @OneToMany(() => Report, (report) => report.handledBy)
  handledReports: Report[];

  @OneToOne(
    () => ModeratorProfile,
    (moderatorProfile) => moderatorProfile.moderator,
    // { cascade: true },
  )
  moderatorProfile: ModeratorProfile;
}
