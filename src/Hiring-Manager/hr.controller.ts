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
import { HrService } from './hr.service';
import { PostDto } from 'src/Post/dto/post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { HrDto, HrLoginDto, PasswordChangeHrDto } from './dto/hr.dto';
import { JobDto } from 'src/Job/dto/job.dto';
import { UpdateJobDto } from 'src/Job/dto/updateJob.dto';
import { Hr } from 'src/Db/hiring.entity';
import { SessionGuard } from 'src/Guards/session.guard';
import { OfferDTO } from 'src/OfferLetter/dto/offer.dto';
import { CommentDto } from 'src/Comment/dto/comment.dto';
import {
  ForgetPassHrDto,
  PasswordForgetHrDto,
  UpdateHrDto,
} from './dto/updatehr.dto';

@Controller('hr')
export class HrController {
  constructor(private readonly hrService: HrService) {}

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
  ): any {
    hr.profileImg = myfileobj.filename;
    hr.createdDate = new Date();
    hr.updatedDate = new Date();
    return this.hrService.addHr(hr);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async loginHr(@Body() hr: HrLoginDto, @Session() session): Promise<any> {
    const res = this.hrService.loginHr(hr);

    if ((await res) === true) {
      session.email = hr.email;
      console.log(session.email);
      return res;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Hr not found',
      });
    }
  }

  @Get('/myprofile')
  @UseGuards(SessionGuard)
  myProfile(@Session() session): any {
    return this.hrService.myProfile(session.email);
  }

  @Put('/updateprofile')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updateProfile(@Body() data: UpdateHrDto, @Session() session): any {
    data.updatedDate = new Date();
    return this.hrService.editProfile(data, session.email);
  }

  @Patch('/changePassword')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  changePassword(@Body() data: PasswordChangeHrDto, @Session() session): any {
    return this.hrService.passwordChange(data, session.email);
  }

  @Post('/job')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  addJob(@Body() data: JobDto, @Session() session) {
    return this.hrService.addJob(data, session.email);
  }

  @Get('/myJob')
  @UseGuards(SessionGuard)
  getMyJobPost(@Session() session): any {
    return this.hrService.getJobByHrId(session.email);
  }

  @Get('/job/:id')
  @UseGuards(SessionGuard)
  getJobByHrId(@Param('id', ParseIntPipe) id: number, @Session() session): any {
    return this.hrService.getJobDetails(id, session.email);
  }

  @Delete('/job/:id')
  @UseGuards(SessionGuard)
  deleteJobByHr(
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ): any {
    return this.hrService.deleteJob(id, session.email);
  }

  @Put('/job/:id')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updatePost(
    @Body() data: UpdateJobDto,
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ) {
    data.updatedDate = new Date();
    return this.hrService.updateJob(id, data, session.email);
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

  @Get('/allPost')
  @UseGuards(SessionGuard)
  getPost(@Session() session): any {
    return this.hrService.getAllPost(session.email);
  }

  @Get('/allJob')
  @UseGuards(SessionGuard)
  getJob(@Session() session): any {
    return this.hrService.getAllJob(session.email);
  }

  @Post('/offerLetter/:id')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  addLetter(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: OfferDTO,
    @Session() session,
  ) {
    data.createdDate = new Date();
    return this.hrService.addLetter(id, data, session.email);
  }

  @Get('/candidate/:id')
  @UseGuards(SessionGuard)
  getCandidateList(
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ): any {
    return this.hrService.getAllCandidate(id, session.email);
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
    return this.hrService.addComment(id, data, session.email);
  }

  @Get('/postComment/:id')
  @UseGuards(SessionGuard)
  getPostComment(
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ): any {
    return this.hrService.getPostComment(id, session.email);
  }

  @Delete('/comment/:id')
  @UseGuards(SessionGuard)
  deleteComment(
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ): any {
    return this.hrService.deleteComment(id, session.email);
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
    return this.hrService.addReplyComment(id, data, session.email);
  }

  @Get('/replycomment/:id')
  @UseGuards(SessionGuard)
  getReplyComment(
    @Param('id', ParseIntPipe) id: number,
    @Session() session,
  ): any {
    return this.hrService.getReplyComment(id, session.email);
  }
  @Get('/getimage')
  @UseGuards(SessionGuard)
  async getting(@Res() res, @Session() session): Promise<any> {
    await this.hrService.getImages(res, session.email);
  }

  @Delete('/delete')
  @UseGuards(SessionGuard)
  deleteStudent(@Session() session): any {
    return this.hrService.deleteHr(session.email);
  }

  @Post('/sentmail')
  @UsePipes(new ValidationPipe())
  sentMail(@Body() data: PasswordForgetHrDto): any {
    return this.hrService.ForgetPassword(data.email);
  }

  @Patch('/forgetPassword')
  @UsePipes(new ValidationPipe())
  forgetPass(@Body() data: ForgetPassHrDto): any {
    return this.hrService.newPassword(data);
  }

  @Get('/createNetwork/:id')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  createNetwork(@Param('id', ParseIntPipe) id: number, @Session() session) {
    return this.hrService.createNetwork(id, session.email);
  }

  @Get('/network')
  @UseGuards(SessionGuard)
  getNetwork(@Session() session): any {
    return this.hrService.getNetwork(session.email);
  }
}
