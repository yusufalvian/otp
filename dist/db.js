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
exports.Repo = exports.getDb = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const getDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = new sqlite3_1.default.Database('sqlite.db', (err) => {
        if (err) {
            console.error('Error opening database: ', err.message);
        }
        else {
            console.log('Connected to the SQLite database.');
        }
    });
    return db;
});
exports.getDb = getDb;
class Repo {
    constructor() {
        this.getUser = (db, email) => __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM users WHERE email = '${email}'`;
            const result = yield db.all(query);
            yield db.run(query, function (err, row) {
                if (err) {
                    console.log("sqlite error");
                }
                else {
                    return row[0];
                }
            });
        });
        this.addUser = (db, user) => __awaiter(this, void 0, void 0, function* () {
            const query = `INSERT INTO users (email, password, is_active) VALUES ('${user.email}', '${user.password}', ${user.is_active});`;
            yield db.run(query, function (err) {
                if (err) {
                    console.log("sqlite error");
                }
            });
        });
        this.updateUser = (db, user) => __awaiter(this, void 0, void 0, function* () {
            const query = `UPDATE users SET email = '${user.email}', password = '${user.password}', is_active = ${user.is_active} WHERE email = '${user.email}'`;
            yield db.run(query, function (err) {
                if (err) {
                    console.log("sqlite error");
                }
            });
        });
    }
}
exports.Repo = Repo;
//# sourceMappingURL=db.js.map