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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisClient = void 0;
const { REDIS_ACCESS } = process.env;
const redis_1 = require("redis");
const redisClient = (0, redis_1.createClient)({
    url: REDIS_ACCESS,
    socket: {
        tls: false,
    },
});
const getRedisClient = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!redisClient.isOpen) {
        yield redisClient
            .connect()
            .then(() => console.log("redis connected"))
            .catch((e) => console.log("failed to connect to redis"));
    }
    return redisClient;
});
exports.getRedisClient = getRedisClient;
//# sourceMappingURL=redis.js.map