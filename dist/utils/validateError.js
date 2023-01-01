"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const validateRegister = (name, email, password, confirmPassword) => {
    const errors = {};
    if (name === "")
        errors.name = "Enter your name";
    if (email === "") {
        errors.email = "Enter Email";
    }
    else {
        const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]/;
        if (!email.match(regEx)) {
            errors.email = "Enter a valid email";
        }
    }
    if (password.length < 5)
        errors.password = "password must be greater than 5";
    if (password !== confirmPassword)
        errors.confirmPassword = "confirm password must be the same as password";
    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};
exports.validateRegister = validateRegister;
//# sourceMappingURL=validateError.js.map