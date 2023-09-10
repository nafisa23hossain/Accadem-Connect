"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admin_entity_1 = require("./admin.entity");
const comment_entity_1 = require("./comment.entity");
const hiring_entity_1 = require("./hiring.entity");
const job_entity_1 = require("./job.entity");
const moderator_entity_1 = require("./moderator.entity");
const offer_entity_1 = require("./offer.entity");
const post_entity_1 = require("./post.entity");
const report_entity_1 = require("./report.entity");
const student_entity_1 = require("./student.entity");
const moderatorProfile_dto_1 = require("./moderatorProfile.dto");
const student_hr_entity_1 = require("./student_hr.entity");
const adminProfile_entity_1 = require("./adminProfile.entity");
const token_entity_1 = require("./token.entity");
const hrProfile_entity_1 = require("./hrProfile.entity");
const studentProfile_entity_1 = require("./studentProfile.entity");
let DbModule = exports.DbModule = class DbModule {
};
exports.DbModule = DbModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                admin_entity_1.Admin,
                comment_entity_1.Comment,
                hiring_entity_1.Hr,
                job_entity_1.Job,
                moderator_entity_1.Moderator,
                offer_entity_1.Offer,
                post_entity_1.Post,
                report_entity_1.Report,
                student_entity_1.Student,
                moderatorProfile_dto_1.ModeratorProfile,
                student_hr_entity_1.StudentHr,
                adminProfile_entity_1.AdminProfile,
                token_entity_1.Token,
                hrProfile_entity_1.HrProfile,
                studentProfile_entity_1.StudentProfile,
            ]),
        ],
        controllers: [],
        providers: [],
        exports: [typeorm_1.TypeOrmModule],
    })
], DbModule);
//# sourceMappingURL=db.module.js.map