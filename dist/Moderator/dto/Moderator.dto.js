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
exports.ForgetPassModeratorDto = exports.PasswordForgetModeratorDto = exports.PasswordChangeModeratorDto = exports.ModeratorLoginDto = exports.ModeratorDto = void 0;
const class_validator_1 = require("class-validator");
class ModeratorDto {
}
exports.ModeratorDto = ModeratorDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[A-Z][A-Za-z ]+$/),
    __metadata("design:type", String)
], ModeratorDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ModeratorDto.prototype, "age", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(11),
    __metadata("design:type", String)
], ModeratorDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Email is not correct' }),
    __metadata("design:type", String)
], ModeratorDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ModeratorDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ModeratorDto.prototype, "education", void 0);
__decorate([
    (0, class_validator_1.MinLength)(7, {
        message: 'Minimum length of the password should be equal or greater than 7',
    }),
    __metadata("design:type", String)
], ModeratorDto.prototype, "password", void 0);
class ModeratorLoginDto {
}
exports.ModeratorLoginDto = ModeratorLoginDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'It is not an email' }),
    __metadata("design:type", String)
], ModeratorLoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'It is not a string' }),
    (0, class_validator_1.MinLength)(7, {
        message: 'Minimum length of the password should be equal or greater than 7',
    }),
    __metadata("design:type", String)
], ModeratorLoginDto.prototype, "password", void 0);
class PasswordChangeModeratorDto {
}
exports.PasswordChangeModeratorDto = PasswordChangeModeratorDto;
__decorate([
    (0, class_validator_1.MinLength)(7, {
        message: 'Minimum length of the password should be equal or greater than 7',
    }),
    __metadata("design:type", String)
], PasswordChangeModeratorDto.prototype, "newPassword", void 0);
class PasswordForgetModeratorDto {
}
exports.PasswordForgetModeratorDto = PasswordForgetModeratorDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'It is not an email' }),
    __metadata("design:type", String)
], PasswordForgetModeratorDto.prototype, "email", void 0);
class ForgetPassModeratorDto {
}
exports.ForgetPassModeratorDto = ForgetPassModeratorDto;
__decorate([
    (0, class_validator_1.MinLength)(7, {
        message: 'Minimum length of the password should be equal or greater than 7',
    }),
    __metadata("design:type", String)
], ForgetPassModeratorDto.prototype, "newPassword", void 0);
//# sourceMappingURL=Moderator.dto.js.map