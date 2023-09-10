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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const moderator_entity_1 = require("../Db/moderator.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const admin_entity_1 = require("../Db/admin.entity");
const bcrypt = require("bcrypt");
const student_entity_1 = require("../Db/student.entity");
const hiring_entity_1 = require("../Db/hiring.entity");
const adminProfile_entity_1 = require("../Db/adminProfile.entity");
const mailer_1 = require("@nestjs-modules/mailer");
const uuid_1 = require("uuid");
const token_entity_1 = require("../Db/token.entity");
const hrProfile_entity_1 = require("../Db/hrProfile.entity");
const studentProfile_entity_1 = require("../Db/studentProfile.entity");
const moderatorProfile_dto_1 = require("../Db/moderatorProfile.dto");
let AdminService = exports.AdminService = class AdminService {
    constructor(adminRepo, moderatorRepo, studentRepo, hrRepo, adminProfileRepo, tokenRepo, hrProfileRepo, studentProfileRepo, moderatorProfileRepo, mailService) {
        this.adminRepo = adminRepo;
        this.moderatorRepo = moderatorRepo;
        this.studentRepo = studentRepo;
        this.hrRepo = hrRepo;
        this.adminProfileRepo = adminProfileRepo;
        this.tokenRepo = tokenRepo;
        this.hrProfileRepo = hrProfileRepo;
        this.studentProfileRepo = studentProfileRepo;
        this.moderatorProfileRepo = moderatorProfileRepo;
        this.mailService = mailService;
    }
    async changePassword(changedPass, email) {
        const admin = await this.adminRepo.findOneBy({
            email: email,
        });
        const isMatch = await bcrypt.compare(changedPass.oldPassword, admin.password);
        console.log(changedPass.oldPassword);
        if (isMatch) {
            const salt = await bcrypt.genSalt();
            admin.password = await bcrypt.hash(changedPass.newPassword, salt);
            const res = await this.adminRepo.update(admin.id, admin);
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Not found the user',
            });
        }
    }
    async getStudentByAdminId(email) {
        const res = await this.adminRepo.find({
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
                message: 'There is something wrong',
            });
        }
    }
    async adminProfile(email) {
        const admin = await this.adminProfileRepo.findOneBy({ email: email });
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
    async accessControl(id, access, email) {
        const admin = await this.adminRepo.findOneBy({ email: email });
        if (admin) {
            const res = await this.moderatorRepo.update(id, access);
            if (res) {
                return res;
            }
            else {
                throw new common_1.NotFoundException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Not found the user',
                });
            }
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'You are not the valid admin',
            });
        }
    }
    async deleteHr(id, email) {
        const admin = await this.adminRepo.findOneBy({ email: email });
        if (admin) {
            const hrId = await this.hrRepo.findOneBy({ id: id });
            const res2 = await this.hrProfileRepo.delete({ email: hrId.email });
            const res = await this.hrRepo.delete(id);
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
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'You are not the valid admin',
            });
        }
    }
    async updateHr(id, hr, email) {
        const admin = await this.adminRepo.findOneBy({ email: email });
        if (admin) {
            const res = await this.hrRepo.update({ id: id }, hr);
            const num = await this.hrRepo.findOneBy({ id: id });
            const res2 = await this.hrProfileRepo.update({ email: num.email }, hr);
            if (res && res2) {
                return res;
            }
            else {
                throw new common_1.NotFoundException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Not found the user',
                });
            }
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'You are not the valid admin',
            });
        }
    }
    async getHrById(id, email) {
        const admin = await this.adminRepo.findOneBy({ email: email });
        console.log(email);
        if (admin) {
            const res = await this.hrRepo.findOneBy({ id: id });
            if (res) {
                return res;
            }
            else {
                throw new common_1.NotFoundException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Not found the user',
                });
            }
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'You are not the valid admin',
            });
        }
    }
    async getAllHr(email) {
        const admin = await this.adminRepo.findOneBy({ email: email });
        if (admin) {
            const res = await this.hrRepo.find();
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
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'You are not an admin',
            });
        }
    }
    async addHr(hr, email) {
        const admin = await this.adminRepo.findOneBy({ email: email });
        if (admin) {
            hr.createdByAdmin = admin.id;
            const salt = await bcrypt.genSalt();
            const hassedpassed = await bcrypt.hash(hr.password, salt);
            hr.password = hassedpassed;
            const res = await this.hrRepo.save(hr);
            if (res) {
                await this.hrProfileRepo.save({
                    name: hr.name,
                    age: hr.age,
                    phone: hr.phone,
                    email: hr.email,
                    gender: hr.gender,
                    updatedDate: hr.updatedDate,
                    hr: res.id,
                });
                return res;
            }
            else {
                throw new common_1.ServiceUnavailableException({
                    status: common_1.HttpStatus.SERVICE_UNAVAILABLE,
                    message: 'There is something wrong',
                });
            }
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'You are not an admin',
            });
        }
    }
    async deleteStudent(id, email) {
        const admin = await this.adminRepo.findOneBy({ email: email });
        if (admin) {
            const std = await this.studentRepo.findOneBy({ id: id });
            const res2 = await this.studentProfileRepo.delete({ email: std.email });
            const res = await this.studentRepo.delete(id);
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
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'You are not the valid admin',
            });
        }
    }
    async getModeratorByAdminId(email) {
        const res = await this.adminRepo.find({
            where: { email: email },
            relations: {
                moderators: true,
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
    async getModeratorById(id, email) {
        const admin = await this.adminRepo.findOneBy({ email: email });
        if (admin) {
            const res = await this.moderatorRepo.findOneBy({ id: id });
            if (res) {
                return res;
            }
            else {
                throw new common_1.NotFoundException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Not found the user',
                });
            }
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'You are not the valid admin',
            });
        }
    }
    async getAllModerator(email) {
        const admin = await this.adminRepo.findOneBy({ email: email });
        if (admin) {
            const res = await this.moderatorRepo.find();
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
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'You are not an admin',
            });
        }
    }
    async addModerator(moderator, email) {
        const admin = await this.adminRepo.findOneBy({ email: email });
        if (admin) {
            moderator.status = 'Inactive';
            moderator.createdBy = admin.id;
            const salt = await bcrypt.genSalt();
            const hassedpassed = await bcrypt.hash(moderator.password, salt);
            moderator.password = hassedpassed;
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
                throw new common_1.ServiceUnavailableException({
                    status: common_1.HttpStatus.SERVICE_UNAVAILABLE,
                    message: 'There is something wrong',
                });
            }
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'You are not an admin',
            });
        }
    }
    async getAllStudent() {
        const res = await this.studentRepo.find();
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
    async updateStudent(id, student, email) {
        const admin = await this.adminRepo.findOneBy({ email: email });
        if (admin) {
            const std = await this.studentRepo.findOneBy({ id: id });
            const res = await this.studentRepo.update({ id: id }, student);
            const res2 = await this.studentProfileRepo.update({ email: std.email }, student);
            if (res && res2) {
                return res;
            }
            else {
                throw new common_1.NotFoundException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Not found the user',
                });
            }
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'You are not the valid admin',
            });
        }
    }
    async getStudentById(id, email) {
        const admin = await this.adminRepo.findOneBy({ email: email });
        console.log(email);
        if (admin) {
            const res = await this.studentRepo.findOneBy({ id: id });
            if (res) {
                return res;
            }
            else {
                throw new common_1.NotFoundException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Not found the user',
                });
            }
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'You are not the valid admin',
            });
        }
    }
    async addStudent(student, email) {
        const salt = await bcrypt.genSalt();
        student.password = await bcrypt.hash(student.password, salt);
        const adm = await this.adminRepo.findOneBy({ email: email });
        student.createdByAdmin = adm.id;
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
        else {
            throw new common_1.InternalServerErrorException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'There is something wrong',
            });
        }
    }
    async updateAdmin(email, admin) {
        const res = await this.adminRepo.update({ email: email }, admin);
        const res2 = await this.adminProfileRepo.update({ email: email }, admin);
        if (res && res2) {
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Admin not found',
            });
        }
    }
    async adminLogin(admin) {
        const adm = await this.adminRepo.findOneBy({ email: admin.email });
        if (adm) {
            const isMatch = await bcrypt.compare(admin.password, adm.password);
            if (isMatch)
                return isMatch;
        }
        else {
            return false;
        }
    }
    async deleteModeratorByAdminId(id, email) {
        const admin = await this.adminRepo.findOneBy({ email: email });
        const mrId = await this.moderatorRepo.findOneBy({ id: id });
        if (admin) {
            const res2 = await this.moderatorProfileRepo.delete({
                email: mrId.email,
            });
            const res = await this.moderatorRepo.delete(id);
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
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'You are not the valid admin',
            });
        }
    }
    async updateModeratorByAdminId(id, moderator, email) {
        const admin = await this.adminRepo.findOneBy({ email: email });
        if (admin) {
            const res = await this.moderatorRepo.update(id, moderator);
            const name = await this.moderatorRepo.findOneBy({ id: id });
            const res2 = await this.moderatorProfileRepo.update({ email: name.email }, moderator);
            if (res && res2) {
                return res;
            }
            else {
                throw new common_1.NotFoundException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Not found the user',
                });
            }
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'You are not the valid admin',
            });
        }
    }
    async getHrWithAdmin(email) {
        const res = await this.adminRepo.find({
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
                message: 'There is something wrong',
            });
        }
    }
    async getImages(res, email) {
        const admin = await this.adminRepo.findOneBy({ email: email });
        if (admin) {
            res.sendFile(admin.profileImg, { root: './uploads/admin' });
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
        const admin = await this.adminRepo.findOneBy({ email: email });
        if (admin) {
            await this.tokenRepo.save({
                otp: uniqueId.substring(0, 6),
                userId: admin.id,
                createdDate: new Date(),
            });
            await this.mailService.sendMail({
                to: email,
                subject: 'Student Forum',
                text: `Hello ${admin.name}. Here is your otp: ${uniqueId.substring(0, 6)}`,
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
                const admin = await this.adminRepo.findOneBy({ id: matchToken.userId });
                const salt = await bcrypt.genSalt();
                admin.password = await bcrypt.hash(data.newPassword, salt);
                return await this.adminRepo.update(admin.id, admin);
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
], AdminService.prototype, "getImages", null);
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __param(1, (0, typeorm_1.InjectRepository)(moderator_entity_1.Moderator)),
    __param(2, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(3, (0, typeorm_1.InjectRepository)(hiring_entity_1.Hr)),
    __param(4, (0, typeorm_1.InjectRepository)(adminProfile_entity_1.AdminProfile)),
    __param(5, (0, typeorm_1.InjectRepository)(token_entity_1.Token)),
    __param(6, (0, typeorm_1.InjectRepository)(hrProfile_entity_1.HrProfile)),
    __param(7, (0, typeorm_1.InjectRepository)(studentProfile_entity_1.StudentProfile)),
    __param(8, (0, typeorm_1.InjectRepository)(moderatorProfile_dto_1.ModeratorProfile)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mailer_1.MailerService])
], AdminService);
//# sourceMappingURL=admin.service.js.map