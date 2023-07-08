"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const jwt_decode_1 = require("jwt-decode");
dotenv.config();
class ValidationToken {
    constructor() {
        this.generateToken = (user_email, user_firstName, user_lastName, user_DateOfBirth, user_type) => {
            this.payload = {
                user_email,
                user_firstName,
                user_lastName,
                user_DateOfBirth,
                user_type,
            };
            const json = jwt.sign(this.payload, this.jwtSecret, this.jwtConfig);
            return json;
        };
        this.verify = (token) => {
            try {
                const ver = jwt.verify(token, this.jwtSecret);
                if (ver) {
                    return true;
                }
                return false;
            }
            catch (error) {
                return false;
            }
        };
        this.decode = async (token) => {
            try {
                const ver = (0, jwt_decode_1.default)(token);
                return {
                    user_firstName: ver.user_firstName,
                    user_lastName: ver.user_lastName,
                    user_DateOfBirth: ver.user_DateOfBirth,
                    user_email: ver.user_email,
                    user_type: ver.user_type,
                };
            }
            catch (error) {
                return {
                    user_firstName: '',
                    user_lastName: '',
                    user_DateOfBirth: new Date(''),
                    user_email: '',
                    user_type: '',
                };
            }
        };
        this.jwtConfig = {
            expiresIn: '120min',
            subject: '1',
        };
        this.payload = {
            user_email: '',
            user_firstName: '',
            user_lastName: '',
            user_DateOfBirth: new Date(''),
            user_type: '',
        };
        this.jwtSecret = process.env.JWT_SECRET;
    }
}
exports.default = ValidationToken;
;
//# sourceMappingURL=ValidationToken.js.map