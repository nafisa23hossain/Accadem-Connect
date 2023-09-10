import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Res,
} from '@nestjs/common';
import {
  ForgetPassModeratorDto,
  ModeratorDto,
  ModeratorLoginDto,
  PasswordChangeModeratorDto,
} from './dto/Moderator.dto';
import { PostDto } from 'src/Post/dto/post.dto';
import {
  ProfileModeratorDto,
  UpdateModeratorDto,
} from './dto/updateModerator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Moderator } from 'src/Db/moderator.entity';
import { Student } from 'src/Db/student.entity';
import * as bcrypt from 'bcrypt';
import { StudentDto } from 'src/Student/dto/Student.dto';
import { UpdateStudentDto } from 'src/Student/dto/updateStudent.dto';
import { ModeratorProfile } from 'src/Db/moderatorProfile.dto';
import { Post } from 'src/Db/post.entity';

import { Report } from 'src/Db/report.entity';
import { Comment } from 'src/Db/comment.entity';
import { Hr } from 'src/Db/hiring.entity';
import { Token } from 'src/Db/token.entity';
import { v4 as uuidv4 } from 'uuid';
import { MailerService } from '@nestjs-modules/mailer';
import { StudentProfile } from 'src/Db/studentProfile.entity';
import { HrDto } from 'src/Hiring-Manager/dto/hr.dto';
import { HrProfile } from 'src/Db/hrProfile.entity';

@Injectable()
export class ModeratorService {
  constructor(
    @InjectRepository(Moderator) private moderatorRepo: Repository<Moderator>,
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    @InjectRepository(ModeratorProfile)
    private moderatorProfileRepo: Repository<ModeratorProfile>,

    @InjectRepository(Post)
    private postRepo: Repository<Post>,
    @InjectRepository(Report)
    private reportRepo: Repository<Report>,

    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,

    @InjectRepository(StudentProfile)
    private studentProfileRepo: Repository<StudentProfile>,

    @InjectRepository(HrProfile)
    private hrProfileRepo: Repository<HrProfile>,

    @InjectRepository(Hr)
    private hrRepo: Repository<Hr>,

    @InjectRepository(Token)
    private tokenRepo: Repository<Token>,

    private mailService: MailerService,
  ) {}
  async getHrComment(id: number, email: any): Promise<any> {
    const res = await this.hrRepo.find({
      where: { id: id },
      relations: {
        comments: true,
      },
    });

    if (res) {
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  async getStudentComment(id: number, email: any): Promise<any> {
    const res = await this.studentRepo.find({
      where: { id: id },
      relations: {
        comments: true,
      },
    });

    if (res) {
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  async getHrJobs(id: number, email: any): Promise<any> {
    const res = await this.hrRepo.find({
      where: { id: id },
      relations: {
        jobs: true,
      },
    });

    if (res) {
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  async getStudentPost(id: number, email: any): Promise<any> {
    const res = await this.studentRepo.find({
      where: { id: id },
      relations: {
        posts: true,
      },
    });

    if (res) {
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  async allReport(email: any): Promise<any> {
    const mod = await this.moderatorRepo.findOneBy({ email: email });

    if (mod) {
      return await this.reportRepo.find();
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found the user',
      });
    }
  }
  async deleteComment(id: number, email: any): Promise<any> {
    const res = await this.moderatorRepo.findOneBy({ email: email });
    if (res) {
      const com = await this.commentRepo.delete(id);
      return com;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  async allPostComment(id: number, email: string): Promise<any> {
    const res = await this.postRepo.find({
      where: { id: id },
      relations: {
        comments: { childComments: true },
      },
    });

    if (res) {
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  async allPost(email: string): Promise<any> {
    const mod = await this.moderatorRepo.findOneBy({ email: email });

    if (mod) {
      return await this.postRepo.find();
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found the user',
      });
    }
  }
  async reportHandling(id: number, email: string): Promise<any> {
    const mod = await this.moderatorRepo.findOneBy({ email: email });

    if (mod) {
      const res = await this.reportRepo.findOneBy({ id: id });
      res.handledBy = mod.id;
      if (res) {
        return await this.reportRepo.update({ id: id }, res);
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'Not found the report',
        });
      }
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found the user',
      });
    }
  }
  async deletePost(id: number, email: any): Promise<any> {
    const mod = await this.moderatorRepo.findOneBy({ email: email });

    if (mod) {
      const res = await this.postRepo.delete({ id: id });

      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found the post',
      });
    }
  }
  async deleteStudentByModeratorId(id: number, email: string): Promise<any> {
    const mod = await this.moderatorRepo.findOneBy({ email: email });

    if (mod) {
      const std = await this.studentRepo.findOneBy({
        id: id,
        createdByModerator: mod.id,
      });
      const res2 = await this.studentProfileRepo.delete({
        email: std.email,
      });

      const res = await this.studentRepo.delete({
        id: id,
        createdByModerator: mod.id,
      });

      if (res && res2) {
        return res;
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'Not found the User',
        });
      }
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found the Moderator',
      });
    }
  }

  async deleteHrByModeratorId(id: number, email: string): Promise<any> {
    const mod = await this.moderatorRepo.findOneBy({ email: email });
    if (mod) {
      const hrD = await this.hrRepo.findOneBy({
        id: id,
        createdByModerator: mod.id,
      });
      const res2 = await this.hrProfileRepo.delete({
        email: hrD.email,
      });

      const res = await this.hrRepo.delete({
        id: id,
        createdByModerator: mod.id,
      });
      if (res && res2) {
        return res;
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'Not found the User',
        });
      }
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found the Moderator',
      });
    }
  }

  async getStudentByModerator(email: string): Promise<any> {
    const res = await this.moderatorRepo.find({
      where: { email: email },
      relations: {
        students: true,
      },
    });
    if (res) {
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found the Moderator',
      });
    }
  }

  async getHrByModerator(email: string): Promise<any> {
    const res = await this.moderatorRepo.find({
      where: { email: email },
      relations: {
        hrs: true,
      },
    });
    if (res) {
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found the Moderator',
      });
    }
  }

  async addStudent(student: StudentDto, email: string): Promise<Student> {
    {
      try {
        const moderator = await this.moderatorRepo.findOneBy({ email: email });
        student.createdByModerator = moderator.id;
        student.createdDate = new Date();
        student.updatedDate = new Date();

        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(student.password, salt);
        student.password = hassedpassed;

        const res = await this.studentRepo.save(student);

        if (res) {
          await this.studentProfileRepo.save({
            name: student.name,
            age: student.age,
            phone: student.phone,
            email: student.email,
            gender: student.gender,
            updatedDate: student.updatedDate,
            student: res.id,
          });
          return res;
        }
      } catch (err) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'Something Wrong',
        });
      }
    }
  }

  async addHr(data: HrDto, email: string): Promise<Hr> {
    {
      try {
        const moderator = await this.moderatorRepo.findOneBy({ email: email });
        data.createdByModerator = moderator.id;
        data.createdDate = new Date();
        data.updatedDate = new Date();

        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(data.password, salt);
        data.password = hassedpassed;

        const res = await this.hrRepo.save(data);

        if (res) {
          await this.hrProfileRepo.save({
            name: data.name,
            age: data.age,
            phone: data.phone,
            email: data.email,
            gender: data.gender,
            updatedDate: data.updatedDate,
            hr: res.id,
          });
          return res;
        }
      } catch (err) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'Something Wrong',
        });
      }
    }
  }

  async passwordChange(
    changedPass: PasswordChangeModeratorDto,
    email: string,
  ): Promise<any> {
    const mod = await this.moderatorRepo.findOneBy({
      email: email,
    });
    const isMatch: boolean = await bcrypt.compare(
      changedPass.oldPassword,
      mod.password,
    );

    if (isMatch) {
      const salt = await bcrypt.genSalt();
      mod.password = await bcrypt.hash(changedPass.newPassword, salt);
      const res = await this.moderatorRepo.update(mod.id, mod);

      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found the user',
      });
    }
  }

  async deleteProfile(email: string): Promise<any> {
    const res2 = await this.moderatorProfileRepo.delete({ email: email });
    const res = await this.moderatorRepo.delete({ email: email });

    if (res && res2) {
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  async editProfile(
    moderator: UpdateModeratorDto,
    email: string,
  ): Promise<any> {
    const res = await this.moderatorRepo.update({ email: email }, moderator);

    const res2 = await this.moderatorProfileRepo.update(
      { email: email },
      moderator,
    );

    if (res && res2) {
      return res2;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    }
  }
  async myProfile(email: string): Promise<ModeratorProfile> {
    const admin = await this.moderatorProfileRepo.findOneBy({ email: email });

    if (admin) {
      return admin;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found the user',
      });
    }
  }
  async loginModerator(moderator: ModeratorLoginDto): Promise<any> {
    const mod = await this.moderatorRepo.findOneBy({ email: moderator.email });
    if (mod) {
      const isMatch: boolean = await bcrypt.compare(
        moderator.password,
        mod.password,
      );
      if (isMatch) return isMatch;
    } else {
      return false;
    }
  }
  async addModerator(moderator: ModeratorDto): Promise<any> {
    const salt = await bcrypt.genSalt();
    moderator.password = await bcrypt.hash(moderator.password, salt);

    const res = await this.moderatorRepo.save(moderator);

    if (res) {
      const profile: ProfileModeratorDto = {
        name: res.name,
        age: res.age,
        phone: res.phone,
        email: res.email,
        gender: res.gender,
        createdDate: res.createdDate,
        education: res.education,
        updatedDate: res.updatedDate,
        status: res.status,
        moderator: res.id,
      };
      await this.moderatorProfileRepo.save(profile);
      return res;
    } else {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'There is something wrong',
      });
    }
  }

  async getImages(@Res() res, email: string): Promise<void> {
    const admin = await this.moderatorRepo.findOneBy({ email: email });

    if (admin) {
      res.sendFile(admin.profileImg, { root: './uploads/moderator' });
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }

  async ForgetPassword(email: string) {
    const uniqueId = uuidv4();

    const moderator = await this.moderatorRepo.findOneBy({ email: email });

    if (moderator) {
      await this.tokenRepo.save({
        otp: uniqueId.substring(0, 6),
        userId: moderator.id,
        createdDate: new Date(),
      });

      await this.mailService.sendMail({
        to: email,
        subject: 'Student Forum',
        text: `Hello ${moderator.name}. Here is your otp: ${uniqueId.substring(
          0,
          6,
        )}`,
      });
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }

  async newPassword(data: ForgetPassModeratorDto) {
    const matchToken = await this.tokenRepo.findOneBy({ otp: data.otp });

    if (matchToken) {
      var currentDate = new Date();
      var specifiedDate = new Date(matchToken.createdDate);
      var difference = currentDate.getTime() - specifiedDate.getTime();
      var differenceInMinutes = Math.floor(difference / 1000 / 60);

      if (differenceInMinutes <= 5) {
        const mod = await this.moderatorRepo.findOneBy({
          id: matchToken.userId,
        });

        const salt = await bcrypt.genSalt();
        mod.password = await bcrypt.hash(data.newPassword, salt);

        return await this.moderatorRepo.update(mod.id, mod);
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'you took more than 5 minute',
        });
      }
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'You may entered a wrong otp or you took more than 5 minute',
      });
    }
  }
}
