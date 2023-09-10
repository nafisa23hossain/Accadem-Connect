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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const typeorm_1 = require("typeorm");
const moderator_entity_1 = require("./moderator.entity");
const post_entity_1 = require("./post.entity");
const admin_entity_1 = require("./admin.entity");
const comment_entity_1 = require("./comment.entity");
const offer_entity_1 = require("./offer.entity");
const report_entity_1 = require("./report.entity");
const job_entity_1 = require("./job.entity");
const student_hr_entity_1 = require("./student_hr.entity");
const studentProfile_entity_1 = require("./studentProfile.entity");
let Student = exports.Student = class Student {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Student.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Student.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Student.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "profileImg", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => job_entity_1.Job, (job) => job.students),
    __metadata("design:type", Number)
], Student.prototype, "job", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => moderator_entity_1.Moderator, (moderator) => moderator.students),
    __metadata("design:type", Number)
], Student.prototype, "createdByModerator", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admin_entity_1.Admin, (admin) => admin.students),
    __metadata("design:type", Number)
], Student.prototype, "createdByAdmin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_entity_1.Post, (post) => post.student, { cascade: true }),
    __metadata("design:type", Array)
], Student.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.student, { cascade: true }),
    __metadata("design:type", Array)
], Student.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => offer_entity_1.Offer, (offer) => offer.student),
    __metadata("design:type", Array)
], Student.prototype, "letters", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => report_entity_1.Report, (report) => report.student),
    __metadata("design:type", Array)
], Student.prototype, "reports", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => student_hr_entity_1.StudentHr, (sh) => sh.student),
    __metadata("design:type", Array)
], Student.prototype, "sthr", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => studentProfile_entity_1.StudentProfile, (stdP) => stdP.student),
    __metadata("design:type", studentProfile_entity_1.StudentProfile)
], Student.prototype, "studentProfile", void 0);
exports.Student = Student = __decorate([
    (0, typeorm_1.Entity)('Student')
], Student);
//# sourceMappingURL=student.entity.js.map