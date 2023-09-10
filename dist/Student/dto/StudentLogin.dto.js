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
exports.StudentLoginDto = void 0;
const class_validator_1 = require("class-validator");
class StudentLoginDto {
}
exports.StudentLoginDto = StudentLoginDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'It is not an email' }),
    __metadata("design:type", String)
], StudentLoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'It is not an string' }),
    (0, class_validator_1.MinLength)(7, {
        message: 'Password length should be equal or greater than 7',
    }),
    __metadata("design:type", String)
], StudentLoginDto.prototype, "password", void 0);
//# sourceMappingURL=StudentLogin.dto.js.map