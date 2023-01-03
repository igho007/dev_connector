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
exports.ProfileResolver = void 0;
const graphql_1 = require("graphql");
const type_graphql_1 = require("type-graphql");
const profile_1 = require("./../dto/profile");
const profileObjects_1 = require("./../object/profileObjects");
const types_1 = require("./../types");
let ProfileResolver = class ProfileResolver {
    async getProfile() {
        return "Hello profile";
    }
    async createOrUpdateProfile({ company, skills, status, location, website, bio, githubusername, facebook, youtube, twitter, linkedin, }, { prisma, req }) {
        try {
            if (!req.user)
                throw new graphql_1.GraphQLError("User not allowed");
            let userInput = await prisma.user.findFirstOrThrow({
                where: { userId: req.user.userId },
            });
            const profile = await prisma.profile.upsert({
                where: { id: userInput.id },
                update: {
                    company,
                    skills,
                    status,
                    location,
                    bio,
                    githubusername,
                    website,
                    socials: {
                        upsert: {
                            update: { facebook, linkedin, twitter, youtube },
                            create: { facebook, linkedin, twitter, youtube },
                        },
                    },
                },
                create: {
                    company,
                    skills,
                    status,
                    location,
                    bio,
                    githubusername,
                    website,
                    userId: userInput.id,
                    createdAt: new Date().toDateString(),
                },
                include: {
                    user: true,
                    socials: true,
                },
            });
            return profile;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    async createProfile({ company, skills, status, location, website, bio, githubusername, facebook, youtube, twitter, linkedin, }, { prisma, req }) {
        try {
            if (!req.user)
                throw new graphql_1.GraphQLError("User not allowed");
            let userInput = await prisma.user.findFirstOrThrow({
                where: { userId: req.user.userId },
            });
            if (status === "" || skills === "")
                throw new graphql_1.GraphQLError("Bad Input", {
                    extensions: { errors: "Skills or status is required" },
                });
            let myProfile = await prisma.profile.findFirst({
                where: { id: userInput.id },
            });
            console.log(myProfile);
            if (myProfile) {
                myProfile = await prisma.profile.update({
                    where: { id: userInput.id },
                    data: {
                        status,
                        bio,
                        location,
                        website,
                        githubusername,
                        company,
                        skills: skills.split(",").map((skill) => skill.trim()),
                        socials: {
                            create: {
                                facebook,
                                twitter,
                                linkedin,
                                youtube,
                            },
                        },
                    },
                });
                console.log(123);
                return myProfile;
            }
            else {
                console.log(4566);
                myProfile = await prisma.profile.create({
                    data: {
                        status,
                        skills: skills.split(",").map((skill) => skill.trim()),
                        createdAt: new Date().toDateString(),
                        company,
                        location,
                        website,
                        bio,
                        email: userInput.email,
                        githubusername,
                        userId: userInput.id,
                        socials: {
                            create: {
                                facebook,
                                twitter,
                                linkedin,
                                youtube,
                            },
                        },
                    },
                    include: {
                        user: true,
                    },
                });
                console.log(myProfile);
                return myProfile;
            }
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "getProfile", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => profileObjects_1.Profile),
    __param(0, (0, type_graphql_1.Arg)("profile")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [profile_1.ProfileInput,
        types_1.Context]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "createOrUpdateProfile", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => profileObjects_1.Profile),
    __param(0, (0, type_graphql_1.Arg)("profile")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [profile_1.ProfileInput,
        types_1.Context]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "createProfile", null);
ProfileResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ProfileResolver);
exports.ProfileResolver = ProfileResolver;
//# sourceMappingURL=ProfileResolver.js.map