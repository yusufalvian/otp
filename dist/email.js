"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const nodejs_nodemailer_outlook_1 = __importDefault(require("nodejs-nodemailer-outlook"));
class Email {
    constructor() {
        this.sendToEmail = (email, message) => __awaiter(this, void 0, void 0, function* () {
            const emailUsername = process.env.EMAIL_OUTLOOK_USERNAME;
            console.log('emailUsername: ', emailUsername);
            const emailPassword = process.env.EMAIL_OUTLOOK_PASSWORD;
            console.log('emailPassword: ', emailPassword);
            nodejs_nodemailer_outlook_1.default.sendEmail({
                auth: {
                    user: emailUsername,
                    pass: emailPassword,
                },
                from: emailUsername,
                to: email,
                subject: "OTP",
                text: message,
            });
        });
    }
}
exports.Email = Email;
//# sourceMappingURL=email.js.map