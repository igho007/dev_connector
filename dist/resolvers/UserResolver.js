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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const login_1 = require("./../dto/login");
const types_1 = require("./../types");
const validateError_1 = require("./../utils/validateError");
const register_1 = require("./../dto/register");
const userObject_1 = require("./../object/userObject");
const type_graphql_1 = require("type-graphql");
const graphql_1 = require("graphql");
const uuid_1 = require("uuid");
const bcrypt_1 = require("bcrypt");
const gravatar_1 = require("gravatar");
const jsonwebtoken_1 = require("jsonwebtoken");
const generateToken = (user) => {
    return (0, jsonwebtoken_1.sign)({ name: user.name, email: user.email, userId: user.userId }, "ighodalo", { expiresIn: "2h" });
};
let UserResolver = class UserResolver {
    async getUser({ req, prisma }) {
        try {
            if (!req.user) {
                throw new graphql_1.GraphQLError("User not allowed");
            }
            const user = await prisma.user.findFirst({
                where: { email: req.user.email },
            });
            return user;
        }
        catch (err) {
            throw err;
        }
    }
    async login({ email, password }, { prisma }) {
        const { errors, valid } = (0, validateError_1.validateLogin)(email, password);
        if (!valid) {
            throw new graphql_1.GraphQLError("Bad Input", { extensions: { errors } });
        }
        try {
            const user = await prisma.user.findFirst({ where: { email } });
            if (!user) {
                errors.message = "wrong email/password";
                throw new graphql_1.GraphQLError("Bad Input", { extensions: { errors } });
            }
            const isMatch = await (0, bcrypt_1.compare)(password, user.password);
            if (!isMatch) {
                errors.message = "wrong email/password";
                throw new graphql_1.GraphQLError("Bad Input", { extensions: { errors } });
            }
            const token = generateToken(user);
            return Object.assign(Object.assign({}, user), { token });
        }
        catch (err) {
            throw err;
        }
    }
    async register({ name, email, password, confirmPassword }, { prisma }) {
        const { errors, valid } = (0, validateError_1.validateRegister)(name, email, password, confirmPassword);
        if (!valid) {
            throw new graphql_1.GraphQLError("Bad input", { extensions: { errors } });
        }
        try {
            const userByEmail = await prisma.user.findFirst({ where: { email } });
            if (userByEmail) {
                errors.email = "Email is taken";
                throw new graphql_1.GraphQLError("Bad Input", { extensions: { errors } });
            }
            const avatar = (0, gravatar_1.url)(email, { s: "200", r: "pg", d: "mm" }, true);
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: await (0, bcrypt_1.hash)(password, 12),
                    createdAt: new Date().toDateString(),
                    avatar,
                    userId: (0, uuid_1.v4)(),
                },
                include: {
                    profile: true,
                },
            });
            const token = generateToken(user);
            return Object.assign(Object.assign({}, user), { token });
        }
        catch (err) {
            throw err;
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => userObject_1.User, { name: "user", nullable: false }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.Context]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUser", null);
__decorate([
    (0, type_graphql_1.Query)(() => userObject_1.User),
    __param(0, (0, type_graphql_1.Arg)("login")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_1.Login,
        types_1.Context]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => userObject_1.User),
    __param(0, (0, type_graphql_1.Arg)("register")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_1.Register,
        types_1.Context]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=UserResolver.js.map