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
var Comment_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const typeorm_1 = require("typeorm");
const post_entity_1 = require("./post.entity");
const hiring_entity_1 = require("./hiring.entity");
const student_entity_1 = require("./student.entity");
let Comment = exports.Comment = Comment_1 = class Comment {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comment.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Comment.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_entity_1.Post, (post) => post.comments, { onDelete: 'CASCADE' }),
    __metadata("design:type", Number)
], Comment.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hiring_entity_1.Hr, (hr) => hr.comments),
    __metadata("design:type", Number)
], Comment.prototype, "hr", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, (student) => student.comments, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Number)
], Comment.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Comment_1, (comment) => comment.childComments, {
        nullable: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Number)
], Comment.prototype, "parentComment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comment_1, (comment) => comment.parentComment, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Comment.prototype, "childComments", void 0);
exports.Comment = Comment = Comment_1 = __decorate([
    (0, typeorm_1.Entity)('comment')
], Comment);
//# sourceMappingURL=comment.entity.js.map