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
exports.Profile = void 0;
const userObject_1 = require("./userObject");
const SocialObject_1 = require("./SocialObject");
const EducationObject_1 = require("./EducationObject");
const ExperienceObject_1 = require("./ExperienceObject");
const type_graphql_1 = require("type-graphql");
let Profile = class Profile {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Profile.prototype, "company", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => userObject_1.User, { nullable: true }),
    __metadata("design:type", Object)
], Profile.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Profile.prototype, "website", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Profile.prototype, "bio", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Profile.prototype, "githubusername", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Profile.prototype, "location", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Profile.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
    __metadata("design:type", String)
], Profile.prototype, "skills", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Profile.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [ExperienceObject_1.Experience]),
    __metadata("design:type", Array)
], Profile.prototype, "experience", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [EducationObject_1.Education]),
    __metadata("design:type", Array)
], Profile.prototype, "education", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", SocialObject_1.Social)
], Profile.prototype, "socials", void 0);
Profile = __decorate([
    (0, type_graphql_1.ObjectType)()
], Profile);
exports.Profile = Profile;
//# sourceMappingURL=profileObjects.js.map