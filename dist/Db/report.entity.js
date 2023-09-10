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
exports.Report = void 0;
const typeorm_1 = require("typeorm");
const hiring_entity_1 = require("./hiring.entity");
const student_entity_1 = require("./student.entity");
const moderator_entity_1 = require("./moderator.entity");
let Report = exports.Report = class Report {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Report.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Report.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Report.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Report.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hiring_entity_1.Hr, (hr) => hr.reports),
    __metadata("design:type", Number)
], Report.prototype, "hr", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, (student) => student.reports),
    __metadata("design:type", Number)
], Report.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => moderator_entity_1.Moderator, (moderator) => moderator.handledReports),
    __metadata("design:type", Number)
], Report.prototype, "handledBy", void 0);
exports.Report = Report = __decorate([
    (0, typeorm_1.Entity)('Report')
], Report);
//# sourceMappingURL=report.entity.js.map