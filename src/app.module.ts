import { Module } from '@nestjs/common';
import { AdminModule } from './Admin/admin.module';
import { HrModule } from './Hiring-Manager/hr.module';
import { ModeratorModule } from './Moderator/moderator.module';
import { StudentModule } from './Student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from './Db/db.module';

@Module({
  imports: [
    AdminModule,
    HrModule,
    ModeratorModule,
    StudentModule,
    DbModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '788881137',
      database: 'studentForum',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
