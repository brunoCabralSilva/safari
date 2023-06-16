"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
class ValidationToken {
    constructor() {
        this.generateToken = (email, firstName, lastName, dateOfBirth) => {
            this.payload = { email, firstName, lastName, dateOfBirth };
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
        };
        this.jwtConfig = {
            expiresIn: '120min',
            subject: '1',
        };
        this.payload = {
            email: '',
            firstName: '',
            lastName: '',
            dateOfBirth: new Date(''),
        };
        this.jwtSecret = process.env.JWT_SECRET;
    }
}
exports.default = ValidationToken;
;
//# sourceMappingURL=ValidationToken.js.map