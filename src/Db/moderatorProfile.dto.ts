import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Moderator } from './moderator.entity';

@Entity('ModeratorProfile')
export class ModeratorProfile {
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
  education: string;
  @Column()
  status: string;
  @Column()
  updatedDate: Date;

  @OneToOne(() => Moderator, (moderator) => moderator.moderatorProfile)
  @JoinColumn()
  moderator: number;
}
