"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const common_1 = require("@nestjs/common");
const student_service_1 = require("./student.service");
const Student_dto_1 = require("./dto/Student.dto");
const StudentLogin_dto_1 = require("./dto/StudentLogin.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const post_dto_1 = require("../Post/dto/post.dto");
const updateStudent_dto_1 = require("./dto/updateStudent.dto");
const updatePost_dto_1 = require("../Post/dto/updatePost.dto");
const session_guard_1 = require("../Guards/session.guard");
const comment_dto_1 = require("../Comment/dto/comment.dto");
const report_dto_1 = require("../Report/dto/report.dto");
let StudentController = exports.StudentController = class StudentController {
    constructor(studentService) {
        this.studentService = studentService;
    }
    addStudent(student, myfileobj) {
        student.profileImg = myfileobj.filename;
        student.createdDate = new Date();
        student.updatedDate = new Date();
        return this.studentService.addStudent(student);
    }
    async loginStudent(student, session) {
        const res = this.studentService.loginStudent(student);
        if ((await res) === true) {
            session.email = student.email;
            console.log(session.email);
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Student not found',
            });
        }
    }
    myProfile(session) {
        return this.studentService.myProfile(session.email);
    }
    updateProfile(student, session) {
        student.updatedDate = new Date();
        return this.studentService.editProfile(student, session.email);
    }
    changePassword(student, session) {
        return this.studentService.passwordChange(student, session.email);
    }
    getDashboard(session) {
        return this.studentService.getAllPost(session.email);
    }
    addPost(data, session) {
        return this.studentService.addPost(data, session.email);
    }
    getMyPost(session) {
        return this.studentService.getMyPost(session.email);
    }
    getPostByStudentId(id, session) {
        return this.studentService.getDetailsPost(id, session.email);
    }
    deletePostByStudentId(id, session) {
        console.log(id);
        return this.studentService.deletePostByStudentId(id, session.email);
    }
    updatePost(data, id, session) {
        return this.studentService.updatePost(id, data, session.email);
    }
    Logout(session) {
        if (session.destroy()) {
            return true;
        }
        else {
            return false;
        }
    }
    async getting(res, session) {
        await this.studentService.getImages(res, session.email);
    }
    addComment(id, data, session) {
        data.createdDate = new Date();
        return this.studentService.addComment(id, data, session.email);
    }
    getPostComment(id, session) {
        return this.studentService.getPostComment(id, session.email);
    }
    deleteComment(id, session) {
        return this.studentService.deleteComment(id, session.email);
    }
    addReplyComment(id, data, session) {
        data.createdDate = new Date();
        return this.studentService.addReplyComment(id, data, session.email);
    }
    getReplyComment(id, session) {
        return this.studentService.getReplyComment(id, session.email);
    }
    createNetwork(id, session) {
        return this.studentService.createNetwork(id, session.email);
    }
    addReport(data, session) {
        data.createdDate = new Date();
        return this.studentService.addReport(data, session.email);
    }
    addApply(id, session) {
        return this.studentService.addApply(id, session.email);
    }
    getNetwork(session) {
        return this.studentService.getNetwork(session.email);
    }
    deleteStudent(session) {
        return this.studentService.deleteStudent(session.email);
    }
    sentMail(data) {
        return this.studentService.ForgetPassword(data.email);
    }
    forgetPass(data) {
        return this.studentService.newPassword(data);
    }
    getMyLetter(session) {
        return this.studentService.getMyLetter(session.email);
    }
    getAllJob(session) {
        return this.studentService.getAllJob(session.email);
    }
};
__decorate([
    (0, common_1.Post)('/Register'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('myfile', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                cb(null, true);
            else {
                cb(new multer_1.MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 2000000 },
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/student',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            },
        }),
    })),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Student_dto_1.StudentDto, Object]),
    __metadata("design:returntype", Object)
], StudentController.prototype, "addStudent", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StudentLogin_dto_1.StudentLoginDto, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "loginStudent", null);
__decorate([
    (0, common_1.Get)('/myprofile'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], StudentController.prototype, "myProfile", null);
__decorate([
    (0, common_1.Put)('/updateprofile'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateStudent_dto_1.UpdateStudentDto, Object]),
    __metadata("design:returntype", Object)
], StudentController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Patch)('/changePassword'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Student_dto_1.PasswordChangeStudentDto, Object]),
    __metadata("design:returntype", Object)
], StudentController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)('/allPost'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], StudentController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Post)('/post'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_dto_1.PostDto, Object]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "addPost", null);
__decorate([
    (0, common_1.Get)('/mypost'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], StudentController.prototype, "getMyPost", null);
__decorate([
    (0, common_1.Get)('/post/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], StudentController.prototype, "getPostByStudentId", null);
__decorate([
    (0, common_1.Delete)('/post/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], StudentController.prototype, "deletePostByStudentId", null);
__decorate([
    (0, common_1.Put)('/Post/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updatePost_dto_1.UpdatePostDto, Number, Object]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Get)('/logout'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], StudentController.prototype, "Logout", null);
__decorate([
    (0, common_1.Get)('/getimage'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getting", null);
__decorate([
    (0, common_1.Post)('/comment/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, comment_dto_1.CommentDto, Object]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "addComment", null);
__decorate([
    (0, common_1.Get)('/postComment/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], StudentController.prototype, "getPostComment", null);
__decorate([
    (0, common_1.Delete)('/comment/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], StudentController.prototype, "deleteComment", null);
__decorate([
    (0, common_1.Post)('/replycomment/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, comment_dto_1.CommentDto, Object]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "addReplyComment", null);
__decorate([
    (0, common_1.Get)('/replycomment/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], StudentController.prototype, "getReplyComment", null);
__decorate([
    (0, common_1.Get)('/createNetwork/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "createNetwork", null);
__decorate([
    (0, common_1.Post)('/report'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_dto_1.ReportDto, Object]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "addReport", null);
__decorate([
    (0, common_1.Put)('/apply/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "addApply", null);
__decorate([
    (0, common_1.Get)('/network'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], StudentController.prototype, "getNetwork", null);
__decorate([
    (0, common_1.Delete)('/delete'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], StudentController.prototype, "deleteStudent", null);
__decorate([
    (0, common_1.Post)('/sentmail'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateStudent_dto_1.PasswordForgetStudentDto]),
    __metadata("design:returntype", Object)
], StudentController.prototype, "sentMail", null);
__decorate([
    (0, common_1.Patch)('/forgetPassword'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateStudent_dto_1.ForgetPassStudentDto]),
    __metadata("design:returntype", Object)
], StudentController.prototype, "forgetPass", null);
__decorate([
    (0, common_1.Get)('/myletter'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], StudentController.prototype, "getMyLetter", null);
__decorate([
    (0, common_1.Get)('/allJob'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], StudentController.prototype, "getAllJob", null);
exports.StudentController = StudentController = __decorate([
    (0, common_1.Controller)('student'),
    __metadata("design:paramtypes", [student_service_1.StudentService])
], StudentController);
//# sourceMappingURL=student.controller.js.map