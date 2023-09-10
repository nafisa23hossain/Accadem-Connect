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
exports.ModeratorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moderator_entity_1 = require("../Db/moderator.entity");
const student_entity_1 = require("../Db/student.entity");
const bcrypt = require("bcrypt");
const moderatorProfile_dto_1 = require("../Db/moderatorProfile.dto");
const post_entity_1 = require("../Db/post.entity");
const report_entity_1 = require("../Db/report.entity");
const comment_entity_1 = require("../Db/comment.entity");
const hiring_entity_1 = require("../Db/hiring.entity");
const token_entity_1 = require("../Db/token.entity");
const uuid_1 = require("uuid");
const mailer_1 = require("@nestjs-modules/mailer");
const studentProfile_entity_1 = require("../Db/studentProfile.entity");
const hrProfile_entity_1 = require("../Db/hrProfile.entity");
let ModeratorService = exports.ModeratorService = class ModeratorService {
    constructor(moderatorRepo, studentRepo, moderatorProfileRepo, postRepo, reportRepo, commentRepo, studentProfileRepo, hrProfileRepo, hrRepo, tokenRepo, mailService) {
        this.moderatorRepo = moderatorRepo;
        this.studentRepo = studentRepo;
        this.moderatorProfileRepo = moderatorProfileRepo;
        this.postRepo = postRepo;
        this.reportRepo = reportRepo;
        this.commentRepo = commentRepo;
        this.studentProfileRepo = studentProfileRepo;
        this.hrProfileRepo = hrProfileRepo;
        this.hrRepo = hrRepo;
        this.tokenRepo = tokenRepo;
        this.mailService = mailService;
    }
    async getHrComment(id, email) {
        const res = await this.hrRepo.find({
            where: { id: id },
            relations: {
                comments: true,
            },
        });
        if (res) {
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'There is something wrong',
            });
        }
    }
    async getStudentComment(id, email) {
        const res = await this.studentRepo.find({
            where: { id: id },
            relations: {
                comments: true,
            },
        });
        if (res) {
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'There is something wrong',
            });
        }
    }
    async getHrJobs(id, email) {
        const res = await this.hrRepo.find({
            where: { id: id },
            relations: {
                jobs: true,
            },
        });
        if (res) {
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'There is something wrong',
            });
        }
    }
    async getStudentPost(id, email) {
        const res = await this.studentRepo.find({
            where: { id: id },
            relations: {
                posts: true,
            },
        });
        if (res) {
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'There is something wrong',
            });
        }
    }
    async allReport(email) {
        const mod = await this.moderatorRepo.findOneBy({ email: email });
        if (mod) {
            return await this.reportRepo.find();
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Not found the user',
            });
        }
    }
    async deleteComment(id, email) {
        const res = await this.moderatorRepo.findOneBy({ email: email });
        if (res) {
            const com = await this.commentRepo.delete(id);
            return com;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'There is something wrong',
            });
        }
    }
    async allPostComment(id, email) {
        const res = await this.postRepo.find({
            where: { id: id },
            relations: {
                comments: { childComments: true },
            },
        });
        if (res) {
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'There is something wrong',
            });
        }
    }
    async allPost(email) {
        const mod = await this.moderatorRepo.findOneBy({ email: email });
        if (mod) {
            return await this.postRepo.find();
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Not found the user',
            });
        }
    }
    async reportHandling(id, email) {
        const mod = await this.moderatorRepo.findOneBy({ email: email });
        if (mod) {
            const res = await this.reportRepo.findOneBy({ id: id });
            res.handledBy = mod.id;
            if (res) {
                return await this.reportRepo.update({ id: id }, res);
            }
            else {
                throw new common_1.NotFoundException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Not found the report',
                });
            }
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Not found the user',
            });
        }
    }
    async deletePost(id, email) {
        const mod = await this.moderatorRepo.findOneBy({ email: email });
        if (mod) {
            const res = await this.postRepo.delete({ id: id });
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Not found the post',
            });
        }
    }
    async deleteStudentByModeratorId(id, email) {
        const mod = await this.moderatorRepo.findOneBy({ email: email });
        if (mod) {
            const std = await this.studentRepo.findOneBy({
                id: id,
                createdByModerator: mod.id,
            });
            const res2 = await this.studentProfileRepo.delete({
                email: std.email,
            });
            const res = await this.studentRepo.delete({
                id: id,
                createdByModerator: mod.id,
            });
            if (res && res2) {
                return res;
            }
            else {
                throw new common_1.NotFoundException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Not found the User',
                });
            }
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Not found the Moderator',
            });
        }
    }
    async deleteHrByModeratorId(id, email) {
        const mod = await this.moderatorRepo.findOneBy({ email: email });
        if (mod) {
            const hrD = await this.hrRepo.findOneBy({
                id: id,
                createdByModerator: mod.id,
            });
            const res2 = await this.hrProfileRepo.delete({
                email: hrD.email,
            });
            const res = await this.hrRepo.delete({
                id: id,
                createdByModerator: mod.id,
            });
            if (res && res2) {
                return res;
            }
            else {
                throw new common_1.NotFoundException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Not found the User',
                });
            }
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Not found the Moderator',
            });
        }
    }
    async getStudentByModerator(email) {
        const res = await this.moderatorRepo.find({
            where: { email: email },
            relations: {
                students: true,
            },
        });
        if (res) {
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Not found the Moderator',
            });
        }
    }
    async getHrByModerator(email) {
        const res = await this.moderatorRepo.find({
            where: { email: email },
            relations: {
                hrs: true,
            },
        });
        if (res) {
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Not found the Moderator',
            });
        }
    }
    async addStudent(student, email) {
        {
            try {
                const moderator = await this.moderatorRepo.findOneBy({ email: email });
                student.createdByModerator = moderator.id;
                student.createdDate = new Date();
                student.updatedDate = new Date();
                const salt = await bcrypt.genSalt();
                const hassedpassed = await bcrypt.hash(student.password, salt);
                student.password = hassedpassed;
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
                }
            }
            catch (err) {
                throw new common_1.NotFoundException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Something Wrong',
                });
            }
        }
    }
    async addHr(data, email) {
        {
            try {
                const moderator = await this.moderatorRepo.findOneBy({ email: email });
                data.createdByModerator = moderator.id;
                data.createdDate = new Date();
                data.updatedDate = new Date();
                const salt = await bcrypt.genSalt();
                const hassedpassed = await bcrypt.hash(data.password, salt);
                data.password = hassedpassed;
                const res = await this.hrRepo.save(data);
                if (res) {
                    await this.hrProfileRepo.save({
                        name: data.name,
                        age: data.age,
                        phone: data.phone,
                        email: data.email,
                        gender: data.gender,
                        updatedDate: data.updatedDate,
                        hr: res.id,
                    });
                    return res;
                }
            }
            catch (err) {
                throw new common_1.NotFoundException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Something Wrong',
                });
            }
        }
    }
    async passwordChange(changedPass, email) {
        const mod = await this.moderatorRepo.findOneBy({
            email: email,
        });
        const isMatch = await bcrypt.compare(changedPass.oldPassword, mod.password);
        if (isMatch) {
            const salt = await bcrypt.genSalt();
            mod.password = await bcrypt.hash(changedPass.newPassword, salt);
            const res = await this.moderatorRepo.update(mod.id, mod);
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Not found the user',
            });
        }
    }
    async deleteProfile(email) {
        const res2 = await this.moderatorProfileRepo.delete({ email: email });
        const res = await this.moderatorRepo.delete({ email: email });
        if (res && res2) {
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'There is something wrong',
            });
        }
    }
    async editProfile(moderator, email) {
        const res = await this.moderatorRepo.update({ email: email }, moderator);
        const res2 = await this.moderatorProfileRepo.update({ email: email }, moderator);
        if (res && res2) {
            return res2;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'User not found',
            });
        }
    }
    async myProfile(email) {
        const admin = await this.moderatorProfileRepo.findOneBy({ email: email });
        if (admin) {
            return admin;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Not found the user',
            });
        }
    }
    async loginModerator(moderator) {
        const mod = await this.moderatorRepo.findOneBy({ email: moderator.email });
        if (mod) {
            const isMatch = await bcrypt.compare(moderator.password, mod.password);
            if (isMatch)
                return isMatch;
        }
        else {
            return false;
        }
    }
    async addModerator(moderator) {
        const salt = await bcrypt.genSalt();
        moderator.password = await bcrypt.hash(moderator.password, salt);
        const res = await this.moderatorRepo.save(moderator);
        if (res) {
            const profile = {
                name: res.name,
                age: res.age,
                phone: res.phone,
                email: res.email,
                gender: res.gender,
                createdDate: res.createdDate,
                education: res.education,
                updatedDate: res.updatedDate,
                status: res.status,
                moderator: res.id,
            };
            await this.moderatorProfileRepo.save(profile);
            return res;
        }
        else {
            throw new common_1.InternalServerErrorException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'There is something wrong',
            });
        }
    }
    async getImages(res, email) {
        const admin = await this.moderatorRepo.findOneBy({ email: email });
        if (admin) {
            res.sendFile(admin.profileImg, { root: './uploads/moderator' });
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'There is something wrong',
            });
        }
    }
    async ForgetPassword(email) {
        const uniqueId = (0, uuid_1.v4)();
        const moderator = await this.moderatorRepo.findOneBy({ email: email });
        if (moderator) {
            await this.tokenRepo.save({
                otp: uniqueId.substring(0, 6),
                userId: moderator.id,
                createdDate: new Date(),
            });
            await this.mailService.sendMail({
                to: email,
                subject: 'Student Forum',
                text: `Hello ${moderator.name}. Here is your otp: ${uniqueId.substring(0, 6)}`,
            });
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'There is something wrong',
            });
        }
    }
    async newPassword(data) {
        const matchToken = await this.tokenRepo.findOneBy({ otp: data.otp });
        if (matchToken) {
            var currentDate = new Date();
            var specifiedDate = new Date(matchToken.createdDate);
            var difference = currentDate.getTime() - specifiedDate.getTime();
            var differenceInMinutes = Math.floor(difference / 1000 / 60);
            if (differenceInMinutes <= 5) {
                const mod = await this.moderatorRepo.findOneBy({
                    id: matchToken.userId,
                });
                const salt = await bcrypt.genSalt();
                mod.password = await bcrypt.hash(data.newPassword, salt);
                return await this.moderatorRepo.update(mod.id, mod);
            }
            else {
                throw new common_1.NotFoundException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'you took more than 5 minute',
                });
            }
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'You may entered a wrong otp or you took more than 5 minute',
            });
        }
    }
};
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ModeratorService.prototype, "getImages", null);
exports.ModeratorService = ModeratorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(moderator_entity_1.Moderator)),
    __param(1, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(2, (0, typeorm_1.InjectRepository)(moderatorProfile_dto_1.ModeratorProfile)),
    __param(3, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(4, (0, typeorm_1.InjectRepository)(report_entity_1.Report)),
    __param(5, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(6, (0, typeorm_1.InjectRepository)(studentProfile_entity_1.StudentProfile)),
    __param(7, (0, typeorm_1.InjectRepository)(hrProfile_entity_1.HrProfile)),
    __param(8, (0, typeorm_1.InjectRepository)(hiring_entity_1.Hr)),
    __param(9, (0, typeorm_1.InjectRepository)(token_entity_1.Token)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mailer_1.MailerService])
], ModeratorService);
//# sourceMappingURL=moderator.service.js.map