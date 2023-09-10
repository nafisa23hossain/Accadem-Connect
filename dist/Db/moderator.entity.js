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
exports.Moderator = void 0;
const typeorm_1 = require("typeorm");
const admin_entity_1 = require("./admin.entity");
const student_entity_1 = require("./student.entity");
const hiring_entity_1 = require("./hiring.entity");
const report_entity_1 = require("./report.entity");
const moderatorProfile_dto_1 = require("./moderatorProfile.dto");
let Moderator = exports.Moderator = class Moderator {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Moderator.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Moderator.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Moderator.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Moderator.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Moderator.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Moderator.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Moderator.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Moderator.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Moderator.prototype, "education", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Moderator.prototype, "profileImg", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Moderator.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Moderator.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admin_entity_1.Admin, (admin) => admin.moderators),
    __metadata("design:type", Number)
], Moderator.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => student_entity_1.Student, (student) => student.createdByModerator),
    __metadata("design:type", Array)
], Moderator.prototype, "students", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => hiring_entity_1.Hr, (hr) => hr.createdByModerator),
    __metadata("design:type", Array)
], Moderator.prototype, "hrs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => report_entity_1.Report, (report) => report.handledBy),
    __metadata("design:type", Array)
], Moderator.prototype, "handledReports", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => moderatorProfile_dto_1.ModeratorProfile, (moderatorProfile) => moderatorProfile.moderator),
    __metadata("design:type", moderatorProfile_dto_1.ModeratorProfile)
], Moderator.prototype, "moderatorProfile", void 0);
exports.Moderator = Moderator = __decorate([
    (0, typeorm_1.Entity)('Moderator')
], Moderator);
//# sourceMappingURL=moderator.entity.js.map