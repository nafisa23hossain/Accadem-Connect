/// <reference types="multer" />
import { StudentService } from './student.service';
import { PasswordChangeStudentDto, StudentDto } from './dto/Student.dto';
import { StudentLoginDto } from './dto/StudentLogin.dto';
import { PostDto } from '../Post/dto/post.dto';
import { ForgetPassStudentDto, PasswordForgetStudentDto, UpdateStudentDto } from './dto/updateStudent.dto';
import { UpdatePostDto } from 'src/Post/dto/updatePost.dto';
import { CommentDto } from 'src/Comment/dto/comment.dto';
import { ReportDto } from 'src/Report/dto/report.dto';
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    addStudent(student: StudentDto, myfileobj: Express.Multer.File): any;
    loginStudent(student: StudentLoginDto, session: any): Promise<any>;
    myProfile(session: any): any;
    updateProfile(student: UpdateStudentDto, session: any): any;
    changePassword(student: PasswordChangeStudentDto, session: any): any;
    getDashboard(session: any): any;
    addPost(data: PostDto, session: any): Promise<any>;
    getMyPost(session: any): any;
    getPostByStudentId(id: number, session: any): any;
    deletePostByStudentId(id: number, session: any): any;
    updatePost(data: UpdatePostDto, id: number, session: any): Promise<any>;
    Logout(session: any): any;
    getting(res: any, session: any): Promise<any>;
    addComment(id: number, data: CommentDto, session: any): Promise<any>;
    getPostComment(id: number, session: any): any;
    deleteComment(id: number, session: any): any;
    addReplyComment(id: number, data: CommentDto, session: any): Promise<any>;
    getReplyComment(id: number, session: any): any;
    createNetwork(id: number, session: any): Promise<{
        student: import("../Db/student.entity").Student;
        hr: import("../Db/hiring.entity").Hr;
    } & import("../Db/student_hr.entity").StudentHr>;
    addReport(data: ReportDto, session: any): Promise<ReportDto & import("../Db/report.entity").Report>;
    addApply(id: number, session: any): Promise<import("typeorm").UpdateResult>;
    getNetwork(session: any): any;
    deleteStudent(session: any): any;
    sentMail(data: PasswordForgetStudentDto): any;
    forgetPass(data: ForgetPassStudentDto): any;
    getMyLetter(session: any): any;
    getAllJob(session: any): any;
}
