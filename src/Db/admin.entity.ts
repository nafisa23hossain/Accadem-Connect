import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Moderator } from './moderator.entity';
import { Student } from './student.entity';
import { Hr } from './hiring.entity';
import { AdminProfile } from './adminProfile.entity';

@Entity('admin')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  age: number;
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
  profileImg: string;
  @Column()
  password: string;
  @OneToMany(() => Moderator, (moderator) => moderator.createdBy)
  moderators: Moderator[];
  @OneToMany(() => Student, (student) => student.createdByAdmin)
  students: Student[];
  @OneToMany(() => Hr, (hr) => hr.createdByAdmin)
  hrs: Hr[];

  @OneToOne(
    () => AdminProfile,
    (adminProfile) => adminProfile.admin,
    // { cascade: true },
  )
  adminProfile: AdminProfile;
}
