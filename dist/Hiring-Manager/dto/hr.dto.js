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
exports.PasswordChangeHrDto = exports.HrLoginDto = exports.HrDto = void 0;
const class_validator_1 = require("class-validator");
class HrDto {
}
exports.HrDto = HrDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[A-Z][A-Za-z ]+$/),
    __metadata("design:type", String)
], HrDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], HrDto.prototype, "age", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(11),
    __metadata("design:type", String)
], HrDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Email is not correct' }),
    __metadata("design:type", String)
], HrDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HrDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.MinLength)(7, {
        message: 'Password length should be greater than or equal 7 ',
    }),
    __metadata("design:type", String)
], HrDto.prototype, "password", void 0);
class HrLoginDto {
}
exports.HrLoginDto = HrLoginDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'It is not an email' }),
    __metadata("design:type", String)
], HrLoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'It is not an string' }),
    __metadata("design:type", String)
], HrLoginDto.prototype, "password", void 0);
class PasswordChangeHrDto {
}
exports.PasswordChangeHrDto = PasswordChangeHrDto;
__decorate([
    (0, class_validator_1.MinLength)(7),
    __metadata("design:type", String)
], PasswordChangeHrDto.prototype, "newPassword", void 0);
//# sourceMappingURL=hr.dto.js.map