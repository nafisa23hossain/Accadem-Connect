import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('token')
export class Token {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @Column()
  otp: string;
  @Column()
  createdDate: Date;
}
