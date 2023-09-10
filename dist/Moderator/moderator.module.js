"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeratorModule = void 0;
const common_1 = require("@nestjs/common");
const moderator_controller_1 = require("./moderator.controller");
const moderator_service_1 = require("./moderator.service");
const db_module_1 = require("../Db/db.module");
const mail_module_1 = require("../Mail/mail.module");
let ModeratorModule = exports.ModeratorModule = class ModeratorModule {
};
exports.ModeratorModule = ModeratorModule = __decorate([
    (0, common_1.Module)({
        imports: [db_module_1.DbModule, mail_module_1.MailModule],
        controllers: [moderator_controller_1.ModeratorController],
        providers: [moderator_service_1.ModeratorService],
    })
], ModeratorModule);
//# sourceMappingURL=moderator.module.js.map