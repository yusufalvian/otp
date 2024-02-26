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
const express_1 = __importDefault(require("express"));
const shortid_1 = require("shortid");
const db_1 = require("./db");
const email_1 = require("./email");
const dotenv_1 = __importDefault(require("dotenv"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        dotenv_1.default.config();
        const db = yield (0, db_1.getDb)();
        const repo = new db_1.Repo();
        const email = new email_1.Email();
        app.get("/", (req, res) => {
            res.send("Health check");
        });
        app.post("/register", (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield repo.addUser(db, {
                email: req.body.email,
                password: req.body.password,
                is_active: false,
            });
            const OTP = (0, shortid_1.generate)();
            console.log(OTP);
            yield email.sendToEmail(req.body.email, OTP);
            res.send("register success, next enter otp sent to your email to activate your account");
            res.status(200);
        }));
        // listen to port
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`server is running on port ${port}`);
        });
    });
}
main().catch((error) => {
    console.log(error);
});
//# sourceMappingURL=server.js.map