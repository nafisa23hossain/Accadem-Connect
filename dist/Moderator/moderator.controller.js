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
exports.ModeratorController = void 0;
const common_1 = require("@nestjs/common");
const moderator_service_1 = require("./moderator.service");
const Moderator_dto_1 = require("./dto/Moderator.dto");
const Moderator_dto_2 = require("./dto/Moderator.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const updateModerator_dto_1 = require("./dto/updateModerator.dto");
const Student_dto_1 = require("../Student/dto/Student.dto");
const session_guard_1 = require("../Guards/session.guard");
let ModeratorController = exports.ModeratorController = class ModeratorController {
    constructor(moderatorService) {
        this.moderatorService = moderatorService;
    }
    addModerator(moderator, myfileobj) {
        moderator.profileImg = myfileobj.filename;
        moderator.createdDate = new Date();
        moderator.updatedDate = new Date();
        moderator.status = 'inactive';
        return this.moderatorService.addModerator(moderator);
    }
    async loginModerator(moderator, session) {
        const res = this.moderatorService.loginModerator(moderator);
        if ((await res) === true) {
            session.email = moderator.email;
            console.log(session.email);
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Moderator not found',
            });
        }
    }
    myProfile(session) {
        return this.moderatorService.myProfile(session.email);
    }
    updateProfile(data, session) {
        return this.moderatorService.editProfile(data, session.email);
    }
    deleteProfile(session) {
        return this.moderatorService.deleteProfile(session.email);
    }
    changePassword(changedPass, session) {
        return this.moderatorService.passwordChange(changedPass, session.email);
    }
    addStudent(student, myfileobj, session) {
        student.profileImg = myfileobj.filename;
        return this.moderatorService.addStudent(student, session.email);
    }
    getStudentByModerator(session) {
        return this.moderatorService.getStudentByModerator(session.email);
    }
    deleteStudentByModeratorId(id, session) {
        return this.moderatorService.deleteStudentByModeratorId(id, session.email);
    }
    addHr(student, myfileobj, session) {
        student.profileImg = myfileobj.filename;
        return this.moderatorService.addHr(student, session.email);
    }
    gethrByModerator(session) {
        return this.moderatorService.getHrByModerator(session.email);
    }
    deleteHrByModeratorId(id, session) {
        return this.moderatorService.deleteHrByModeratorId(id, session.email);
    }
    deletePost(id, session) {
        console.log(id);
        return this.moderatorService.deletePost(id, session.email);
    }
    reportHandling(id, session) {
        return this.moderatorService.reportHandling(id, session.email);
    }
    allpost(session) {
        return this.moderatorService.allPost(session.email);
    }
    allpostComment(id, session) {
        return this.moderatorService.allPostComment(id, session.email);
    }
    deleteComment(id, session) {
        return this.moderatorService.deleteComment(id, session.email);
    }
    allReport(session) {
        return this.moderatorService.allReport(session.email);
    }
    moderatorLogout(session) {
        if (session.destroy()) {
            return true;
        }
        else {
            return false;
        }
    }
    getStudentPost(id, session) {
        return this.moderatorService.getStudentPost(id, session.email);
    }
    gethrJobs(id, session) {
        return this.moderatorService.getHrJobs(id, session.email);
    }
    getStudentComment(id, session) {
        return this.moderatorService.getStudentComment(id, session.email);
    }
    gethrComment(id, session) {
        return this.moderatorService.getHrComment(id, session.email);
    }
    async getting(res, session) {
        await this.moderatorService.getImages(res, session.email);
    }
    sentMail(data) {
        return this.moderatorService.ForgetPassword(data.email);
    }
    forgetPass(data) {
        return this.moderatorService.newPassword(data);
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
            destination: './uploads/moderator',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            },
        }),
    })),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Moderator_dto_1.ModeratorDto, Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "addModerator", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Moderator_dto_2.ModeratorLoginDto, Object]),
    __metadata("design:returntype", Promise)
], ModeratorController.prototype, "loginModerator", null);
__decorate([
    (0, common_1.Get)('/myprofile'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "myProfile", null);
__decorate([
    (0, common_1.Put)('/updateprofile'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateModerator_dto_1.UpdateModeratorDto, Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Delete)('/deleteProfile'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "deleteProfile", null);
__decorate([
    (0, common_1.Post)('/changePassword'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Moderator_dto_1.PasswordChangeModeratorDto, Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('/RegisterStudent'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('myfile', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                cb(null, true);
            else {
                cb(new multer_1.MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 200000 },
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/student',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            },
        }),
    })),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Student_dto_1.StudentDto, Object, Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "addStudent", null);
__decorate([
    (0, common_1.Get)('/studentwithModerator'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "getStudentByModerator", null);
__decorate([
    (0, common_1.Delete)('/studentwithModerator/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "deleteStudentByModeratorId", null);
__decorate([
    (0, common_1.Post)('/RegisterHr'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('myfile', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                cb(null, true);
            else {
                cb(new multer_1.MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 200000 },
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/hr',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            },
        }),
    })),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Student_dto_1.StudentDto, Object, Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "addHr", null);
__decorate([
    (0, common_1.Get)('/hrwithModerator'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "gethrByModerator", null);
__decorate([
    (0, common_1.Delete)('/hrwithmoderator/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "deleteHrByModeratorId", null);
__decorate([
    (0, common_1.Delete)('/post/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Put)('/report/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "reportHandling", null);
__decorate([
    (0, common_1.Get)('/post'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "allpost", null);
__decorate([
    (0, common_1.Get)('/postComment/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "allpostComment", null);
__decorate([
    (0, common_1.Delete)('/comment/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "deleteComment", null);
__decorate([
    (0, common_1.Get)('/report'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "allReport", null);
__decorate([
    (0, common_1.Get)('/logout'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "moderatorLogout", null);
__decorate([
    (0, common_1.Get)('/studentPosts/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "getStudentPost", null);
__decorate([
    (0, common_1.Get)('/hrJobs/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "gethrJobs", null);
__decorate([
    (0, common_1.Get)('/studentComment/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "getStudentComment", null);
__decorate([
    (0, common_1.Get)('/hrComments/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "gethrComment", null);
__decorate([
    (0, common_1.Get)('/getimage'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ModeratorController.prototype, "getting", null);
__decorate([
    (0, common_1.Post)('/sentmail'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Moderator_dto_1.PasswordForgetModeratorDto]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "sentMail", null);
__decorate([
    (0, common_1.Patch)('/forgetPassword'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Moderator_dto_1.ForgetPassModeratorDto]),
    __metadata("design:returntype", Object)
], ModeratorController.prototype, "forgetPass", null);
exports.ModeratorController = ModeratorController = __decorate([
    (0, common_1.Controller)('moderator'),
    __metadata("design:paramtypes", [moderator_service_1.ModeratorService])
], ModeratorController);
//# sourceMappingURL=moderator.controller.js.map