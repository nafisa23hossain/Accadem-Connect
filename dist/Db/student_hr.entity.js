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
exports.StudentHr = void 0;
const typeorm_1 = require("typeorm");
const student_entity_1 = require("./student.entity");
const hiring_entity_1 = require("./hiring.entity");
let StudentHr = exports.StudentHr = class StudentHr {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StudentHr.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, (student) => student.sthr),
    __metadata("design:type", student_entity_1.Student)
], StudentHr.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hiring_entity_1.Hr, (hr) => hr.sthr),
    __metadata("design:type", hiring_entity_1.Hr)
], StudentHr.prototype, "hr", void 0);
exports.StudentHr = StudentHr = __decorate([
    (0, typeorm_1.Entity)('student_connection_s_hr')
], StudentHr);
//# sourceMappingURL=student_hr.entity.js.map