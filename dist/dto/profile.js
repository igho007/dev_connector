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
exports.ProfileInput = void 0;
const type_graphql_1 = require("type-graphql");
let ProfileInput = class ProfileInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ProfileInput.prototype, "company", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ProfileInput.prototype, "website", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ProfileInput.prototype, "location", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ProfileInput.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ProfileInput.prototype, "youtube", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ProfileInput.prototype, "facebook", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ProfileInput.prototype, "twitter", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ProfileInput.prototype, "linkedin", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ProfileInput.prototype, "skills", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ProfileInput.prototype, "bio", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ProfileInput.prototype, "githubusername", void 0);
ProfileInput = __decorate([
    (0, type_graphql_1.InputType)()
], ProfileInput);
exports.ProfileInput = ProfileInput;
//# sourceMappingURL=profile.js.map