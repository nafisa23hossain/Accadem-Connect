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
exports.HrController = void 0;
const common_1 = require("@nestjs/common");
const hr_service_1 = require("./hr.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const hr_dto_1 = require("./dto/hr.dto");
const job_dto_1 = require("../Job/dto/job.dto");
const updateJob_dto_1 = require("../Job/dto/updateJob.dto");
const session_guard_1 = require("../Guards/session.guard");
const offer_dto_1 = require("../OfferLetter/dto/offer.dto");
const comment_dto_1 = require("../Comment/dto/comment.dto");
const updatehr_dto_1 = require("./dto/updatehr.dto");
let HrController = exports.HrController = class HrController {
    constructor(hrService) {
        this.hrService = hrService;
    }
    addHr(hr, myfileobj) {
        hr.profileImg = myfileobj.filename;
        hr.createdDate = new Date();
        hr.updatedDate = new Date();
        return this.hrService.addHr(hr);
    }
    async loginHr(hr, session) {
        const res = this.hrService.loginHr(hr);
        if ((await res) === true) {
            session.email = hr.email;
            console.log(session.email);
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Hr not found',
            });
        }
    }
    myProfile(session) {
        return this.hrService.myProfile(session.email);
    }
    updateProfile(data, session) {
        data.updatedDate = new Date();
        return this.hrService.editProfile(data, session.email);
    }
    changePassword(data, session) {
        return this.hrService.passwordChange(data, session.email);
    }
    addJob(data, session) {
        return this.hrService.addJob(data, session.email);
    }
    getMyJobPost(session) {
        return this.hrService.getJobByHrId(session.email);
    }
    getJobByHrId(id, session) {
        return this.hrService.getJobDetails(id, session.email);
    }
    deleteJobByHr(id, session) {
        return this.hrService.deleteJob(id, session.email);
    }
    updatePost(data, id, session) {
        data.updatedDate = new Date();
        return this.hrService.updateJob(id, data, session.email);
    }
    Logout(session) {
        if (session.destroy()) {
            return true;
        }
        else {
            return false;
        }
    }
    getPost(session) {
        return this.hrService.getAllPost(session.email);
    }
    getJob(session) {
        return this.hrService.getAllJob(session.email);
    }
    addLetter(id, data, session) {
        data.createdDate = new Date();
        return this.hrService.addLetter(id, data, session.email);
    }
    getCandidateList(id, session) {
        return this.hrService.getAllCandidate(id, session.email);
    }
    addComment(id, data, session) {
        data.createdDate = new Date();
        return this.hrService.addComment(id, data, session.email);
    }
    getPostComment(id, session) {
        return this.hrService.getPostComment(id, session.email);
    }
    deleteComment(id, session) {
        return this.hrService.deleteComment(id, session.email);
    }
    addReplyComment(id, data, session) {
        data.createdDate = new Date();
        return this.hrService.addReplyComment(id, data, session.email);
    }
    getReplyComment(id, session) {
        return this.hrService.getReplyComment(id, session.email);
    }
    async getting(res, session) {
        await this.hrService.getImages(res, session.email);
    }
    deleteStudent(session) {
        return this.hrService.deleteHr(session.email);
    }
    sentMail(data) {
        return this.hrService.ForgetPassword(data.email);
    }
    forgetPass(data) {
        return this.hrService.newPassword(data);
    }
    createNetwork(id, session) {
        return this.hrService.createNetwork(id, session.email);
    }
    getNetwork(session) {
        return this.hrService.getNetwork(session.email);
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
            destination: './uploads/hr',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            },
        }),
    })),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hr_dto_1.HrDto, Object]),
    __metadata("design:returntype", Object)
], HrController.prototype, "addHr", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hr_dto_1.HrLoginDto, Object]),
    __metadata("design:returntype", Promise)
], HrController.prototype, "loginHr", null);
__decorate([
    (0, common_1.Get)('/myprofile'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], HrController.prototype, "myProfile", null);
__decorate([
    (0, common_1.Put)('/updateprofile'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updatehr_dto_1.UpdateHrDto, Object]),
    __metadata("design:returntype", Object)
], HrController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Patch)('/changePassword'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hr_dto_1.PasswordChangeHrDto, Object]),
    __metadata("design:returntype", Object)
], HrController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('/job'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [job_dto_1.JobDto, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "addJob", null);
__decorate([
    (0, common_1.Get)('/myJob'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], HrController.prototype, "getMyJobPost", null);
__decorate([
    (0, common_1.Get)('/job/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], HrController.prototype, "getJobByHrId", null);
__decorate([
    (0, common_1.Delete)('/job/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], HrController.prototype, "deleteJobByHr", null);
__decorate([
    (0, common_1.Put)('/job/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateJob_dto_1.UpdateJobDto, Number, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Get)('/logout'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], HrController.prototype, "Logout", null);
__decorate([
    (0, common_1.Get)('/allPost'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], HrController.prototype, "getPost", null);
__decorate([
    (0, common_1.Get)('/allJob'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], HrController.prototype, "getJob", null);
__decorate([
    (0, common_1.Post)('/offerLetter/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, offer_dto_1.OfferDTO, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "addLetter", null);
__decorate([
    (0, common_1.Get)('/candidate/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], HrController.prototype, "getCandidateList", null);
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
], HrController.prototype, "addComment", null);
__decorate([
    (0, common_1.Get)('/postComment/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], HrController.prototype, "getPostComment", null);
__decorate([
    (0, common_1.Delete)('/comment/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], HrController.prototype, "deleteComment", null);
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
], HrController.prototype, "addReplyComment", null);
__decorate([
    (0, common_1.Get)('/replycomment/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], HrController.prototype, "getReplyComment", null);
__decorate([
    (0, common_1.Get)('/getimage'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HrController.prototype, "getting", null);
__decorate([
    (0, common_1.Delete)('/delete'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], HrController.prototype, "deleteStudent", null);
__decorate([
    (0, common_1.Post)('/sentmail'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updatehr_dto_1.PasswordForgetHrDto]),
    __metadata("design:returntype", Object)
], HrController.prototype, "sentMail", null);
__decorate([
    (0, common_1.Patch)('/forgetPassword'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updatehr_dto_1.ForgetPassHrDto]),
    __metadata("design:returntype", Object)
], HrController.prototype, "forgetPass", null);
__decorate([
    (0, common_1.Get)('/createNetwork/:id'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], HrController.prototype, "createNetwork", null);
__decorate([
    (0, common_1.Get)('/network'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], HrController.prototype, "getNetwork", null);
exports.HrController = HrController = __decorate([
    (0, common_1.Controller)('hr'),
    __metadata("design:paramtypes", [hr_service_1.HrService])
], HrController);
//# sourceMappingURL=hr.controller.js.map