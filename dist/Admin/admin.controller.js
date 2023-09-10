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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const adminLogin_dto_1 = require("./dto/adminLogin.dto");
const Student_dto_1 = require("../Student/dto/Student.dto");
const Moderator_dto_1 = require("../Moderator/dto/Moderator.dto");
const updateAdmin_dto_1 = require("./dto/updateAdmin.dto");
const updateModerator_dto_1 = require("../Moderator/dto/updateModerator.dto");
const hr_dto_1 = require("../Hiring-Manager/dto/hr.dto");
const updatehr_dto_1 = require("../Hiring-Manager/dto/updatehr.dto");
const moderatorAccess_dto_1 = require("../Moderator/dto/moderatorAccess.dto");
const updateStudent_dto_1 = require("../Student/dto/updateStudent.dto");
const session_guard_1 = require("../Guards/session.guard");
const changePassAdmin_dto_1 = require("./dto/changePassAdmin.dto");
let AdminController = exports.AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async adminLogin(admin, session) {
        const res = this.adminService.adminLogin(admin);
        if ((await res) === true) {
            session.email = admin.email;
            console.log(session.email);
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Admin not found',
            });
        }
    }
    updateAdmin(admin, session, myfileobj) {
        return this.adminService.updateAdmin(session.email, admin);
    }
    addStudent(student, myfileobj, session) {
        student.profileImg = myfileobj.filename;
        student.createdDate = new Date();
        student.updatedDate = new Date();
        return this.adminService.addStudent(student, session.email);
    }
    getAllStudent() {
        return this.adminService.getAllStudent();
    }
    getStudentByAdminId(session) {
        return this.adminService.getStudentByAdminId(session.email);
    }
    getStudentById(id, session) {
        return this.adminService.getStudentById(id, session.email);
    }
    updateStudent(id, student, session) {
        return this.adminService.updateStudent(id, student, session.email);
    }
    deleteStudent(id, session) {
        return this.adminService.deleteStudent(id, session.email);
    }
    addModerator(moderator, myfileobj, session) {
        moderator.profileImg = myfileobj.filename;
        moderator.createdDate = new Date();
        moderator.updatedDate = new Date();
        return this.adminService.addModerator(moderator, session.email);
    }
    getModerator(session) {
        return this.adminService.getAllModerator(session.email);
    }
    getModeratorByAdminId(session) {
        return this.adminService.getModeratorByAdminId(session.email);
    }
    getModeratorById(id, session) {
        return this.adminService.getModeratorById(id, session.email);
    }
    updateModeratorByAdminId(id, moderator, session) {
        moderator.updatedDate = new Date();
        return this.adminService.updateModeratorByAdminId(id, moderator, session.email);
    }
    deleteModeratorByAdminId(id, session) {
        return this.adminService.deleteModeratorByAdminId(id, session.email);
    }
    addHr(hr, myfileobj, session) {
        hr.profileImg = myfileobj.filename;
        hr.createdDate = new Date();
        hr.updatedDate = new Date();
        return this.adminService.addHr(hr, session.email);
    }
    getHr(session) {
        return this.adminService.getAllHr(session.email);
    }
    getHrwithAdmin(session) {
        return this.adminService.getHrWithAdmin(session.email);
    }
    getHrById(id, session) {
        return this.adminService.getHrById(id, session.email);
    }
    updateHrByAdminId(id, hr, session) {
        hr.updatedDate = new Date();
        console.log(hr);
        return this.adminService.updateHr(id, hr, session.email);
    }
    deleteHr(id, session) {
        return this.adminService.deleteHr(id, session.email);
    }
    moderatorAccess(id, access, session) {
        access.status = 'active';
        return this.adminService.accessControl(id, access, session.email);
    }
    adminProfile(session) {
        return this.adminService.adminProfile(session.email);
    }
    adminLogout(session) {
        if (session.destroy()) {
            return true;
        }
        else {
            return false;
        }
    }
    changePassword(changedPass, session) {
        return this.adminService.changePassword(changedPass, session.email);
    }
    async getting(res, session) {
        await this.adminService.getImages(res, session.email);
    }
    sentMail(data) {
        return this.adminService.ForgetPassword(data.email);
    }
    forgetPass(data) {
        return this.adminService.newPassword(data);
    }
};
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [adminLogin_dto_1.AdminLoginDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "adminLogin", null);
__decorate([
    (0, common_1.Put)('/update'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
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
            destination: './uploads/admin',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            },
        }),
    })),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateAdmin_dto_1.UpdateAdminDTO, Object, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateAdmin", null);
__decorate([
    (0, common_1.Post)('/addStudent'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
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
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Student_dto_1.StudentDto, Object, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "addStudent", null);
__decorate([
    (0, common_1.Get)('/student'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAllStudent", null);
__decorate([
    (0, common_1.Get)('/studentwithAdmin'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getStudentByAdminId", null);
__decorate([
    (0, common_1.Get)('/student/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getStudentById", null);
__decorate([
    (0, common_1.Put)('/Student/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateStudent_dto_1.UpdateStudentDto, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateStudent", null);
__decorate([
    (0, common_1.Delete)('/student/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "deleteStudent", null);
__decorate([
    (0, common_1.Post)('/addModerator'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
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
            destination: './uploads/moderator',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            },
        }),
    })),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Moderator_dto_1.ModeratorDto, Object, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "addModerator", null);
__decorate([
    (0, common_1.Get)('/moderator'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getModerator", null);
__decorate([
    (0, common_1.Get)('/moderatorwithAdmin'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getModeratorByAdminId", null);
__decorate([
    (0, common_1.Get)('/moderator/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getModeratorById", null);
__decorate([
    (0, common_1.Put)('/moderator/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateModerator_dto_1.UpdateModeratorDto, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateModeratorByAdminId", null);
__decorate([
    (0, common_1.Delete)('/moderator/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "deleteModeratorByAdminId", null);
__decorate([
    (0, common_1.Post)('/addHr'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
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
            destination: './uploads/hr',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            },
        }),
    })),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hr_dto_1.HrDto, Object, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "addHr", null);
__decorate([
    (0, common_1.Get)('/hr'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getHr", null);
__decorate([
    (0, common_1.Get)('/hrwithAdmin'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getHrwithAdmin", null);
__decorate([
    (0, common_1.Get)('/hr/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getHrById", null);
__decorate([
    (0, common_1.Put)('/hr/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updatehr_dto_1.UpdateHrDto, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateHrByAdminId", null);
__decorate([
    (0, common_1.Delete)('/hr/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "deleteHr", null);
__decorate([
    (0, common_1.Patch)('moderatorAccess/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, moderatorAccess_dto_1.ModeratorAccessDto, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "moderatorAccess", null);
__decorate([
    (0, common_1.Get)('/profile'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "adminProfile", null);
__decorate([
    (0, common_1.Get)('/logout'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "adminLogout", null);
__decorate([
    (0, common_1.Post)('/changePassword'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [changePassAdmin_dto_1.PasswordChangeAdminDto, Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)('/getimage'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getting", null);
__decorate([
    (0, common_1.Post)('/sentmail'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [changePassAdmin_dto_1.PasswordForgetAdminDto]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "sentMail", null);
__decorate([
    (0, common_1.Patch)('/forgetPassword'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [changePassAdmin_dto_1.ForgetPassAdminDto]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "forgetPass", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map