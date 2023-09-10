import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Res,
  Session,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { PasswordChangeStudentDto, StudentDto } from './dto/Student.dto';
import { StudentLoginDto } from './dto/StudentLogin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { PostDto } from '../Post/dto/post.dto';
import {
  ForgetPassStudentDto,
  PasswordForgetStudentDto,
  UpdateStudentDto,
} from './dto/updateStudent.dto';
import { UpdatePostDto } from 'src/Post/dto/updatePost.dto';
import { SessionGuard } from 'src/Guards/session.guard';
import { CommentDto } from 'src/Comment/dto/comment.dto';
import { ReportDto } from 'src/Report/dto/report.dto';
import { ModeratorService } from 'src/Moderator/moderator.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('/Register')
  @UseInterceptors(
    FileInterceptor('myfile', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 2000000 },
      storage: diskStorage({
        destination: './uploads/student',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe())
  addStudent(
    @Body()
    student: StudentDto,
    @UploadedFile() myfileobj: Express.Multer.File,
  ): any {
    student.profileImg = myfileobj.filename;
    student.createdDate = new Date();
    student.updatedDate = new Date();

    return this.studentService.addStudent(student);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async loginStudent(
    @Body() student: StudentLoginDto,
    @Session() session,
  ): Promise<any> {
    const res = this.studentService.loginStudent(student);

    if ((await res) === true) {
      session.email = student.email;
      console.log(session.email);
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Student not found',
      });
    }
  }

  @Get('/myprofile')
  @UseGuards(SessionGuard)
  myProfile(@Session() session): any {
    return this.studentService.myProfile(session.email);
  }

  @Put('/updateprofile')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updateProfile(@Body() student: UpdateStudentDto, @Session() session): any {
    student.updatedDate = new Date();
    return this.studentService.editProfile(student, session.email);
  }

  @Patch('/changePassword')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  changePassword(
    @Body() student: PasswordChangeStudentDto,
    @Session() session,
  ): any {
    return this.studentService.passwordChange(student, session.email);
  }

  @Get('/allPost')
  @UseGuards(SessionGuard)
  getDashboard(@Session() session): any {
    return this.studentService.getAllPost(session.email);
  }

  @Post('/post')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  addPost(@Body() data: PostDto, @Session() session) {
    return this.studentService.addPost(data, session.email);
  }
  @Get('/mypost')
  @UseGuards(SessionGuard)
  getMyPost(@Session() session): any {
    return this.studentService.getMyPost(session.email);
  }

  @Get('/post/:id')
  @UseGuards(SessionGuard)
  getPostByStudentId(
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ): any {
    return this.studentService.getDetailsPost(id, session.email);
  }

  @Delete('/post/:id')
  @UseGuards(SessionGuard)
  deletePostByStudentId(
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ): any {
    console.log(id);
    return this.studentService.deletePostByStudentId(id, session.email);
  }

  @Put('/Post/:id')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updatePost(
    @Body() data: UpdatePostDto,
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ) {
    return this.studentService.updatePost(id, data, session.email);
  }

  @Get('/logout')
  @UseGuards(SessionGuard)
  Logout(@Session() session): any {
    if (session.destroy()) {
      return true;
    } else {
      return false;
    }
  }

  @Get('/getimage')
  @UseGuards(SessionGuard)
  async getting(@Res() res, @Session() session): Promise<any> {
    await this.studentService.getImages(res, session.email);
  }

  @Post('/comment/:id')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  addComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CommentDto,
    @Session() session,
  ) {
    data.createdDate = new Date();
    return this.studentService.addComment(id, data, session.email);
  }

  @Get('/postComment/:id')
  @UseGuards(SessionGuard)
  getPostComment(
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ): any {
    return this.studentService.getPostComment(id, session.email);
  }

  @Delete('/comment/:id')
  @UseGuards(SessionGuard)
  deleteComment(
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ): any {
    return this.studentService.deleteComment(id, session.email);
  }

  @Post('/replycomment/:id')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  addReplyComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CommentDto,
    @Session() session,
  ) {
    data.createdDate = new Date();
    return this.studentService.addReplyComment(id, data, session.email);
  }

  @Get('/replycomment/:id')
  @UseGuards(SessionGuard)
  getReplyComment(
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ): any {
    return this.studentService.getReplyComment(id, session.email);
  }

  @Get('/createNetwork/:id')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  createNetwork(@Param('id', ParseIntPipe) id: number, @Session() session) {
    return this.studentService.createNetwork(id, session.email);
  }

  @Post('/report')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  addReport(@Body() data: ReportDto, @Session() session) {
    data.createdDate = new Date();
    return this.studentService.addReport(data, session.email);
  }

  @Put('/apply/:id')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  addApply(@Param('id', ParseIntPipe) id: number, @Session() session) {
    return this.studentService.addApply(id, session.email);
  }

  @Get('/network')
  @UseGuards(SessionGuard)
  getNetwork(@Session() session): any {
    return this.studentService.getNetwork(session.email);
  }

  @Delete('/delete')
  @UseGuards(SessionGuard)
  deleteStudent(@Session() session): any {
    return this.studentService.deleteStudent(session.email);
  }

  @Post('/sentmail')
  @UsePipes(new ValidationPipe())
  sentMail(@Body() data: PasswordForgetStudentDto): any {
    return this.studentService.ForgetPassword(data.email);
  }

  @Patch('/forgetPassword')
  @UsePipes(new ValidationPipe())
  forgetPass(@Body() data: ForgetPassStudentDto): any {
    return this.studentService.newPassword(data);
  }

  @Get('/myletter')
  @UseGuards(SessionGuard)
  getMyLetter(@Session() session): any {
    return this.studentService.getMyLetter(session.email);
  }

  @Get('/allJob')
  @UseGuards(SessionGuard)
  getAllJob(@Session() session): any {
    return this.studentService.getAllJob(session.email);
  }
}
