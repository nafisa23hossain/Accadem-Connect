/// <reference types="multer" />
import { ModeratorService } from './moderator.service';
import { ForgetPassModeratorDto, ModeratorDto, PasswordChangeModeratorDto, PasswordForgetModeratorDto } from './dto/Moderator.dto';
import { ModeratorLoginDto } from './dto/Moderator.dto';
import { UpdateModeratorDto } from './dto/updateModerator.dto';
import { StudentDto } from 'src/Student/dto/Student.dto';
export declare class ModeratorController {
    private readonly moderatorService;
    constructor(moderatorService: ModeratorService);
    addModerator(moderator: ModeratorDto, myfileobj: Express.Multer.File): any;
    loginModerator(moderator: ModeratorLoginDto, session: any): Promise<any>;
    myProfile(session: any): any;
    updateProfile(data: UpdateModeratorDto, session: any): any;
    deleteProfile(session: any): any;
    changePassword(changedPass: PasswordChangeModeratorDto, session: any): any;
    addStudent(student: StudentDto, myfileobj: Express.Multer.File, session: any): any;
    getStudentByModerator(session: any): any;
    deleteStudentByModeratorId(id: number, session: any): any;
    addHr(student: StudentDto, myfileobj: Express.Multer.File, session: any): any;
    gethrByModerator(session: any): any;
    deleteHrByModeratorId(id: number, session: any): any;
    deletePost(id: number, session: any): any;
    reportHandling(id: number, session: any): any;
    allpost(session: any): any;
    allpostComment(id: number, session: any): any;
    deleteComment(id: number, session: any): any;
    allReport(session: any): any;
    moderatorLogout(session: any): any;
    getStudentPost(id: number, session: any): any;
    gethrJobs(id: number, session: any): any;
    getStudentComment(id: number, session: any): any;
    gethrComment(id: number, session: any): any;
    getting(res: any, session: any): Promise<any>;
    sentMail(data: PasswordForgetModeratorDto): any;
    forgetPass(data: ForgetPassModeratorDto): any;
}
