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
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const student_entity_1 = require("../Db/student.entity");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("../Db/post.entity");
const bcrypt = require("bcrypt");
const comment_entity_1 = require("../Db/comment.entity");
const hiring_entity_1 = require("../Db/hiring.entity");
const report_entity_1 = require("../Db/report.entity");
const student_hr_entity_1 = require("../Db/student_hr.entity");
const uuid_1 = require("uuid");
const token_entity_1 = require("../Db/token.entity");
const mailer_1 = require("@nestjs-modules/mailer");
const studentProfile_entity_1 = require("../Db/studentProfile.entity");
const job_entity_1 = require("../Db/job.entity");
let StudentService = exports.StudentService = class StudentService {
    async getAllJob(email) {
        const res = await this.jobRepo.find({});
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
    constructor(studentRepo, postRepo, commentRepo, hrRepo, reportRepo, studentProfileRepo, studentHrRepo, tokenRepo, mailService, jobRepo) {
        this.studentRepo = studentRepo;
        this.postRepo = postRepo;
        this.commentRepo = commentRepo;
        this.hrRepo = hrRepo;
        this.reportRepo = reportRepo;
        this.studentProfileRepo = studentProfileRepo;
        this.studentHrRepo = studentHrRepo;
        this.tokenRepo = tokenRepo;
        this.mailService = mailService;
        this.jobRepo = jobRepo;
    }
    async deleteStudent(email) {
        const res2 = await this.studentProfileRepo.delete({ email: email });
        const res = await this.studentRepo.delete({ email: email });
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
    async getNetwork(email) {
        const std = await this.studentRepo.find({
            where: { email: email },
            relations: {
                sthr: true,
            },
        });
        if (std) {
            return std;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'There is something wrong',
            });
        }
    }
    async addApply(id, email) {
        const std = await this.studentRepo.findOneBy({ email: email });
        if (std) {
            std.job = id;
            return await this.studentRepo.update(std.id, std);
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'There is something wrong',
            });
        }
    }
    async addReport(data, email) {
        const student = await this.studentRepo.findOneBy({ email: email });
        if (student) {
            data.student = student.id;
            const res = await this.reportRepo.save(data);
            if (res) {
                return res;
            }
            else {
                throw new common_1.InternalServerErrorException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'There is something wrong',
                });
            }
        }
        else {
            throw new common_1.InternalServerErrorException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'There is something wrong',
            });
        }
    }
    async createNetwork(id, email) {
        const std = await this.studentRepo.findOneBy({ email: email });
        if (std) {
            const hr = await this.hrRepo.findOneBy({ id: id });
            const ex = await this.studentHrRepo.findOneBy({ student: std, hr: hr });
            if (!ex) {
                return await this.studentHrRepo.save({ student: std, hr: hr });
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
                message: 'There is something wrong',
            });
        }
    }
    async getReplyComment(id, email) {
        const std = await this.studentRepo.findOneBy({ email: email });
        console.log(std);
        if (std) {
            const res = await this.commentRepo.find({
                where: { id: id },
                relations: {
                    childComments: true,
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
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'There is something wrong',
            });
        }
    }
    async addReplyComment(id, data, email) {
        const student = await this.studentRepo.findOneBy({ email: email });
        if (student) {
            data.student = student.id;
            data.parentComment = id;
            const res = await this.commentRepo.save(data);
            if (res) {
                return res;
            }
            else {
                throw new common_1.InternalServerErrorException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'There is something wrong',
                });
            }
        }
    }
    async deleteComment(id, email) {
        const res = await this.studentRepo.findOneBy({ email: email });
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
    async getPostComment(id, email) {
        const std = await this.studentRepo.findOneBy({ email: email });
        if (std) {
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
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'There is something wrong',
            });
        }
    }
    async addComment(id, data, email) {
        const student = await this.studentRepo.findOneBy({ email: email });
        if (student) {
            data.student = student.id;
            data.post = id;
            const res = await this.commentRepo.save(data);
            if (res) {
                return res;
            }
            else {
                throw new common_1.InternalServerErrorException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'There is something wrong',
                });
            }
        }
    }
    async getDetailsPost(id, email) {
        const std = await this.studentRepo.findOneBy({ email: email });
        if (std) {
            const res = await this.postRepo.findOneBy({ id: id });
            if (res) {
                return res;
            }
            else {
                throw new common_1.NotFoundException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Post Not Found',
                });
            }
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'There is something wrong',
            });
        }
    }
    async getAllPost(email) {
        const res = await this.postRepo.find();
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
    async deletePostByStudentId(id, email) {
        const stud = true;
        if (stud) {
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
    async getMyPost(email) {
        const res = await this.studentRepo.find({
            where: { email: email },
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
    async updatePost(id, data, email) {
        const stud = await this.studentRepo.findOneBy({ email: email });
        if (stud) {
            data.updatedDate = new Date();
            const res = await this.postRepo.update({ id: id, student: stud.id }, data);
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Not found the post',
            });
        }
    }
    async passwordChange(changedPass, email) {
        const student = await this.studentRepo.findOneBy({
            email: email,
        });
        const isMatch = await bcrypt.compare(changedPass.oldPassword, student.password);
        if (isMatch) {
            const salt = await bcrypt.genSalt();
            student.password = await bcrypt.hash(changedPass.newPassword, salt);
            const res = await this.studentRepo.update(student.id, student);
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Not found the user',
            });
        }
    }
    async addPost(data, email) {
        const student = await this.studentRepo.findOneBy({ email: email });
        if (student) {
            data.createdDate = new Date();
            data.updatedDate = new Date();
            data.student = student.id;
            console.log(data.student);
            const res = await this.postRepo.save(data);
            if (res) {
                return res;
            }
            else {
                throw new common_1.InternalServerErrorException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'There is something wrong',
                });
            }
        }
    }
    async editProfile(student, email) {
        const res = await this.studentRepo.update({ email: email }, student);
        const res2 = await this.studentProfileRepo.update({ email: email }, student);
        if (res && res2) {
            return res;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'User not found',
            });
        }
    }
    async myProfile(email) {
        const student = await this.studentProfileRepo.findOneBy({ email: email });
        if (student) {
            return student;
        }
        else {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Not found the user',
            });
        }
    }
    async loginStudent(student) {
        const res = await this.studentRepo.findOneBy({ email: student.email });
        if (res) {
            const isMatch = await bcrypt.compare(student.password, res.password);
            if (isMatch)
                return isMatch;
        }
        else {
            return false;
        }
    }
    async addStudent(student) {
        const salt = await bcrypt.genSalt();
        student.password = await bcrypt.hash(student.password, salt);
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
    async getImages(res, email) {
        const admin = await this.studentRepo.findOneBy({ email: email });
        if (admin) {
            res.sendFile(admin.profileImg, { root: './uploads/student' });
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
        const std = await this.studentRepo.findOneBy({ email: email });
        if (std) {
            await this.tokenRepo.save({
                otp: uniqueId.substring(0, 6),
                userId: std.id,
                createdDate: new Date(),
            });
            await this.mailService.sendMail({
                to: email,
                subject: 'Student Forum',
                text: `Hello ${std.name}. Here is your otp: ${uniqueId.substring(0, 6)}`,
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
                const std = await this.studentRepo.findOneBy({ id: matchToken.userId });
                const salt = await bcrypt.genSalt();
                std.password = await bcrypt.hash(data.newPassword, salt);
                return await this.studentRepo.update(std.id, std);
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
    async getMyLetter(email) {
        const res = await this.studentRepo.find({
            where: { email: email },
            relations: {
                letters: true,
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
};
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], StudentService.prototype, "getImages", null);
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(1, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(2, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(3, (0, typeorm_1.InjectRepository)(hiring_entity_1.Hr)),
    __param(4, (0, typeorm_1.InjectRepository)(report_entity_1.Report)),
    __param(5, (0, typeorm_1.InjectRepository)(studentProfile_entity_1.StudentProfile)),
    __param(6, (0, typeorm_1.InjectRepository)(student_hr_entity_1.StudentHr)),
    __param(7, (0, typeorm_1.InjectRepository)(token_entity_1.Token)),
    __param(9, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mailer_1.MailerService,
        typeorm_2.Repository])
], StudentService);
//# sourceMappingURL=student.service.js.map