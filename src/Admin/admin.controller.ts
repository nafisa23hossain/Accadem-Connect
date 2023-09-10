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
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { AdminLoginDto } from './dto/adminLogin.dto';
import { StudentDto } from 'src/Student/dto/Student.dto';
import { ModeratorDto } from 'src/Moderator/dto/Moderator.dto';
import { UpdateAdminDTO } from './dto/updateAdmin.dto';
import { UpdateModeratorDto } from 'src/Moderator/dto/updateModerator.dto';
import { HrDto } from 'src/Hiring-Manager/dto/hr.dto';
import { UpdateHrDto } from 'src/Hiring-Manager/dto/updatehr.dto';
import { ModeratorAccessDto } from 'src/Moderator/dto/moderatorAccess.dto';
import { UpdateStudentDto } from 'src/Student/dto/updateStudent.dto';
import { SessionGuard } from 'src/Guards/session.guard';
import {
  ForgetPassAdminDto,
  PasswordChangeAdminDto,
  PasswordForgetAdminDto,
} from './dto/changePassAdmin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async adminLogin(
    @Body() admin: AdminLoginDto,
    @Session() session,
  ): Promise<any> {
    const res = this.adminService.adminLogin(admin);

    if ((await res) === true) {
      session.email = admin.email;
      console.log(session.email);
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Admin not found',
      });
    }
  }

  // @Post('/changePass')
  // @UsePipes(new ValidationPipe())
  // changePassword(): any {
  //   return this.adminService.changePass('Admin12345');
  // }

  @Put('/update')
  @UseGuards(SessionGuard)
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
        destination: './uploads/admin',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe())
  updateAdmin(
    @Body() admin: UpdateAdminDTO,
    @Session() session,
    @UploadedFile() myfileobj: Express.Multer.File,
  ): any {
    //admin.profileImg = myfileobj.filename;

    return this.adminService.updateAdmin(session.email, admin);
  }

  @Post('/addStudent')
  @UseGuards(SessionGuard)
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
    @Session() session,
  ): any {
    student.profileImg = myfileobj.filename;
    student.createdDate = new Date();
    student.updatedDate = new Date();

    return this.adminService.addStudent(student, session.email);
  }

  @Get('/student')
  @UseGuards(SessionGuard)
  getAllStudent(): any {
    return this.adminService.getAllStudent();
  }

  @Get('/studentwithAdmin')
  @UseGuards(SessionGuard)
  getStudentByAdminId(@Session() session): any {
    return this.adminService.getStudentByAdminId(session.email);
  }

  @Get('/student/:id')
  @UseGuards(SessionGuard)
  getStudentById(
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ): any {
    return this.adminService.getStudentById(id, session.email);
  }

  @Put('/Student/:id')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updateStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() student: UpdateStudentDto,
    @Session() session,
  ): any {
    return this.adminService.updateStudent(id, student, session.email);
  }

  @Delete('/student/:id')
  @UseGuards(SessionGuard)
  deleteStudent(
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ): any {
    return this.adminService.deleteStudent(id, session.email);
  }

  @Post('/addModerator')
  @UseGuards(SessionGuard)
  @UseInterceptors(
    FileInterceptor('myfile', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 200000 },
      storage: diskStorage({
        destination: './uploads/moderator',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe())
  addModerator(
    @Body()
    moderator: ModeratorDto,
    @UploadedFile() myfileobj: Express.Multer.File,
    @Session() session,
  ): any {
    moderator.profileImg = myfileobj.filename;
    moderator.createdDate = new Date();
    moderator.updatedDate = new Date();

    return this.adminService.addModerator(moderator, session.email);
  }

  @Get('/moderator')
  @UseGuards(SessionGuard)
  getModerator(@Session() session): any {
    return this.adminService.getAllModerator(session.email);
  }

  @Get('/moderatorwithAdmin')
  @UseGuards(SessionGuard)
  getModeratorByAdminId(@Session() session): any {
    return this.adminService.getModeratorByAdminId(session.email);
  }

  @Get('/moderator/:id')
  @UseGuards(SessionGuard)
  getModeratorById(
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ): any {
    return this.adminService.getModeratorById(id, session.email);
  }

  @Put('/moderator/:id')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updateModeratorByAdminId(
    @Param('id', ParseIntPipe) id: number,
    @Body() moderator: UpdateModeratorDto,
    @Session() session,
  ): any {
    moderator.updatedDate = new Date();
    return this.adminService.updateModeratorByAdminId(
      id,
      moderator,
      session.email,
    );
  }

  @Delete('/moderator/:id')
  @UseGuards(SessionGuard)
  deleteModeratorByAdminId(
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ): any {
    return this.adminService.deleteModeratorByAdminId(id, session.email);
  }

  //Hr

  @Post('/addHr')
  @UseGuards(SessionGuard)
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
        destination: './uploads/hr',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe())
  addHr(
    @Body()
    hr: HrDto,
    @UploadedFile() myfileobj: Express.Multer.File,
    @Session() session,
  ): any {
    hr.profileImg = myfileobj.filename;
    hr.createdDate = new Date();
    hr.updatedDate = new Date();
    return this.adminService.addHr(hr, session.email);
  }

  @Get('/hr')
  @UseGuards(SessionGuard)
  getHr(@Session() session): any {
    return this.adminService.getAllHr(session.email);
  }

  @Get('/hrwithAdmin')
  @UseGuards(SessionGuard)
  getHrwithAdmin(@Session() session): any {
    return this.adminService.getHrWithAdmin(session.email);
  }

  @Get('/hr/:id')
  @UseGuards(SessionGuard)
  getHrById(@Param('id', ParseIntPipe) id: number, @Session() session): any {
    return this.adminService.getHrById(id, session.email);
  }

  @Put('/hr/:id')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updateHrByAdminId(
    @Param('id', ParseIntPipe) id: number,
    @Body() hr: UpdateHrDto,
    @Session() session,
  ): any {
    hr.updatedDate = new Date();
    console.log(hr);

    return this.adminService.updateHr(id, hr, session.email);
  }

  @Delete('/hr/:id')
  @UseGuards(SessionGuard)
  deleteHr(@Param('id', ParseIntPipe) id: number, @Session() session): any {
    return this.adminService.deleteHr(id, session.email);
  }
  @Patch('moderatorAccess/:id')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  moderatorAccess(
    @Param('id', ParseIntPipe) id: number,
    @Body() access: ModeratorAccessDto,
    @Session() session,
  ): any {
    access.status = 'active';
    return this.adminService.accessControl(id, access, session.email);
  }

  @Get('/profile')
  @UseGuards(SessionGuard)
  adminProfile(@Session() session): any {
    return this.adminService.adminProfile(session.email);
  }

  @Get('/logout')
  @UseGuards(SessionGuard)
  adminLogout(@Session() session): any {
    if (session.destroy()) {
      return true;
    } else {
      return false;
    }
  }

  @Post('/changePassword')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  changePassword(
    @Body() changedPass: PasswordChangeAdminDto,
    @Session() session,
  ): any {
    return this.adminService.changePassword(changedPass, session.email);
  }

  @Get('/getimage')
  @UseGuards(SessionGuard)
  async getting(@Res() res, @Session() session): Promise<any> {
    await this.adminService.getImages(res, session.email);
  }

  @Post('/sentmail')
  @UsePipes(new ValidationPipe())
  sentMail(@Body() data: PasswordForgetAdminDto): any {
    return this.adminService.ForgetPassword(data.email);
  }

  @Patch('/forgetPassword')
  @UsePipes(new ValidationPipe())
  forgetPass(@Body() data: ForgetPassAdminDto): any {
    return this.adminService.newPassword(data);
  }
}
