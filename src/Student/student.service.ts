import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { PasswordChangeStudentDto, StudentDto } from './dto/Student.dto';
import { StudentLoginDto } from './dto/StudentLogin.dto';
import { PostDto } from '../Post/dto/post.dto';
import {
  ForgetPassStudentDto,
  UpdateStudentDto,
} from './dto/updateStudent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/Db/student.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/Db/post.entity';
import { UpdatePostDto } from 'src/Post/dto/updatePost.dto';
import * as bcrypt from 'bcrypt';
import e from 'express';
import { log } from 'console';
import { CommentDto } from 'src/Comment/dto/comment.dto';
import { Comment } from 'src/Db/comment.entity';
import { connect } from 'http2';
import { Hr } from 'src/Db/hiring.entity';
import { ReportDto } from 'src/Report/dto/report.dto';
import { Report } from 'src/Db/report.entity';
import { ApplyDto } from './dto/apply.dto';
import { StudentHr } from 'src/Db/student_hr.entity';
import { v4 as uuidv4 } from 'uuid';
import { Token } from 'src/Db/token.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { StudentProfile } from 'src/Db/studentProfile.entity';
import { Job } from 'src/Db/job.entity';

@Injectable()
export class StudentService {
  async getAllJob(email: string): Promise<any> {
    const res = await this.jobRepo.find({});

    if (res) {
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    @InjectRepository(Hr) private hrRepo: Repository<Hr>,
    @InjectRepository(Report) private reportRepo: Repository<Report>,
    @InjectRepository(StudentProfile)
    private studentProfileRepo: Repository<StudentProfile>,

    @InjectRepository(StudentHr) private studentHrRepo: Repository<StudentHr>,
    @InjectRepository(Token) private tokenRepo: Repository<Token>,
    private mailService: MailerService,
    @InjectRepository(Job) private jobRepo: Repository<Job>,
  ) {}
  async deleteStudent(email: string): Promise<any> {
    const res2 = await this.studentProfileRepo.delete({ email: email });
    const res = await this.studentRepo.delete({ email: email });

    if (res) {
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  async getNetwork(email: string): Promise<any> {
    const std = await this.studentRepo.find({
      where: { email: email },
      relations: {
        sthr: true,
      },
    });

    if (std) {
      return std;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  async addApply(id: number, email: string) {
    const std = await this.studentRepo.findOneBy({ email: email });

    if (std) {
      std.job = id;
      return await this.studentRepo.update(std.id, std);
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  async addReport(data: ReportDto, email: string) {
    const student = await this.studentRepo.findOneBy({ email: email });
    if (student) {
      data.student = student.id;

      const res = await this.reportRepo.save(data);

      if (res) {
        return res;
      } else {
        throw new InternalServerErrorException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'There is something wrong',
        });
      }
    } else {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'There is something wrong',
      });
    }
  }
  async createNetwork(id: number, email: string) {
    const std = await this.studentRepo.findOneBy({ email: email });

    if (std) {
      const hr = await this.hrRepo.findOneBy({ id: id });

      const ex = await this.studentHrRepo.findOneBy({ student: std, hr: hr });
      if (!ex) {
        return await this.studentHrRepo.save({ student: std, hr: hr });
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'There is something wrong',
        });
      }
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  async getReplyComment(id: number, email: string): Promise<any> {
    const std = await this.studentRepo.findOneBy({ email: email });
    console.log(std);
    if (std) {
      const res = await this.commentRepo.find({
        where: { id: id },
        relations: {
          childComments: true,
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
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  async addReplyComment(
    id: number,
    data: CommentDto,
    email: string,
  ): Promise<any> {
    const student = await this.studentRepo.findOneBy({ email: email });
    if (student) {
      data.student = student.id;
      data.parentComment = id;
      const res = await this.commentRepo.save(data);

      if (res) {
        return res;
      } else {
        throw new InternalServerErrorException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'There is something wrong',
        });
      }
    }
  }
  async deleteComment(id: number, email: string): Promise<any> {
    const res = await this.studentRepo.findOneBy({ email: email });
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
  async getPostComment(id: number, email: string): Promise<any> {
    const std = await this.studentRepo.findOneBy({ email: email });
    if (std) {
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
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }

  async addComment(id: number, data: CommentDto, email: string): Promise<any> {
    const student = await this.studentRepo.findOneBy({ email: email });
    if (student) {
      data.student = student.id;
      data.post = id;
      const res = await this.commentRepo.save(data);

      if (res) {
        return res;
      } else {
        throw new InternalServerErrorException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'There is something wrong',
        });
      }
    }
  }
  async getDetailsPost(id: number, email: any): Promise<any> {
    const std = await this.studentRepo.findOneBy({ email: email });

    if (std) {
      const res = await this.postRepo.findOneBy({ id: id });
      if (res) {
        return res;
      } else {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: 'Post Not Found',
        });
      }
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }
  async getAllPost(email: string): Promise<Post[]> {
    const res = await this.postRepo.find();

    if (res) {
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }

  async deletePostByStudentId(id: number, email: string): Promise<any> {
    //const stud = await this.studentRepo.findOneBy({ email: email });
    const stud = true;

    if (stud) {
      // const res = await this.postRepo.delete({ id: id, student: stud.id });
      const res = await this.postRepo.delete({ id: id });

      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found the post',
      });
    }
  }
  async getMyPost(email: string): Promise<any> {
    const res = await this.studentRepo.find({
      where: { email: email },
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
  async updatePost(
    id: number,
    data: UpdatePostDto,
    email: string,
  ): Promise<any> {
    const stud = await this.studentRepo.findOneBy({ email: email });

    if (stud) {
      data.updatedDate = new Date();
      const res = await this.postRepo.update(
        { id: id, student: stud.id },
        data,
      );

      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found the post',
      });
    }
  }

  async passwordChange(
    changedPass: PasswordChangeStudentDto,
    email: string,
  ): Promise<any> {
    const student = await this.studentRepo.findOneBy({
      email: email,
    });
    const isMatch: boolean = await bcrypt.compare(
      changedPass.oldPassword,
      student.password,
    );

    if (isMatch) {
      const salt = await bcrypt.genSalt();
      student.password = await bcrypt.hash(changedPass.newPassword, salt);
      const res = await this.studentRepo.update(student.id, student);

      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found the user',
      });
    }
  }

  async addPost(data: PostDto, email: string): Promise<any> {
    const student = await this.studentRepo.findOneBy({ email: email });
    if (student) {
      data.createdDate = new Date();
      data.updatedDate = new Date();
      data.student = student.id;
      console.log(data.student); //don't ever use studentId instead of student, bcz in database there is already a studentId. we have to cut Id
      const res = await this.postRepo.save(data);

      if (res) {
        return res;
      } else {
        throw new InternalServerErrorException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'There is something wrong',
        });
      }
    }
  }

  async editProfile(student: UpdateStudentDto, email: string): Promise<any> {
    const res = await this.studentRepo.update({ email: email }, student);
    const res2 = await this.studentProfileRepo.update(
      { email: email },
      student,
    );
    if (res && res2) {
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    }
  }
  async myProfile(email: string): Promise<StudentProfile> {
    const student = await this.studentProfileRepo.findOneBy({ email: email });

    if (student) {
      return student;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found the user',
      });
    }
  }
  async loginStudent(student: StudentLoginDto): Promise<any> {
    const res = await this.studentRepo.findOneBy({ email: student.email });
    if (res) {
      const isMatch: boolean = await bcrypt.compare(
        student.password,
        res.password,
      );
      if (isMatch) return isMatch;
    } else {
      return false;
    }
  }

  async addStudent(student: StudentDto): Promise<any> {
    const salt = await bcrypt.genSalt();
    student.password = await bcrypt.hash(student.password, salt);

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
    } else {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'There is something wrong',
      });
    }
  }

  async getImages(@Res() res, email: string): Promise<void> {
    const admin = await this.studentRepo.findOneBy({ email: email });

    if (admin) {
      res.sendFile(admin.profileImg, { root: './uploads/student' });
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'There is something wrong',
      });
    }
  }

  async ForgetPassword(email: string) {
    const uniqueId = uuidv4();

    const std = await this.studentRepo.findOneBy({ email: email });

    if (std) {
      await this.tokenRepo.save({
        otp: uniqueId.substring(0, 6),
        userId: std.id,
        createdDate: new Date(),
      });

      await this.mailService.sendMail({
        to: email,
        subject: 'Student Forum',
        text: `Hello ${std.name}. Here is your otp: ${uniqueId.substring(
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

  async newPassword(data: ForgetPassStudentDto) {
    const matchToken = await this.tokenRepo.findOneBy({ otp: data.otp });

    if (matchToken) {
      var currentDate = new Date();
      var specifiedDate = new Date(matchToken.createdDate);
      var difference = currentDate.getTime() - specifiedDate.getTime();
      var differenceInMinutes = Math.floor(difference / 1000 / 60);

      if (differenceInMinutes <= 5) {
        const std = await this.studentRepo.findOneBy({ id: matchToken.userId });

        const salt = await bcrypt.genSalt();
        std.password = await bcrypt.hash(data.newPassword, salt);

        return await this.studentRepo.update(std.id, std);
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

  async getMyLetter(email: string): Promise<any> {
    const res = await this.studentRepo.find({
      where: { email: email },
      relations: {
        letters: true,
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
}
