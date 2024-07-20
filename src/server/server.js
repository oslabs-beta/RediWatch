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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express, { Request, Response } from 'express';
// @ts-nocheck
var express = require('express');
var perf_hooks_1 = require("perf_hooks");
var ioredis_1 = require("ioredis");
require("dotenv/config");
require('dotenv').config();
var app = express();
var PORT = 3001;
app.use(express.json());
var redisClient = new ioredis_1.default({
    host: 'localhost',
    port: 6379
});
redisClient.on('error', function (err) { return console.error('Redis Client Error', err); });
redisClient.on('connect', function () { return console.log('Redis client connected'); });
app.post('/test', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var configResult, performanceMetrics, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                // Connect to Redis
                return [4 /*yield*/, redisClient.ping()];
            case 1:
                // Connect to Redis
                _a.sent();
                console.log('connected to Redis');
                // Set maxmemory to 30mb
                return [4 /*yield*/, redisClient.config('SET', 'maxmemory', '216mb')];
            case 2:
                // Set maxmemory to 30mb
                _a.sent();
                console.log('maxmemory set to 216mb');
                return [4 /*yield*/, redisClient.config('GET', 'maxmemory')];
            case 3:
                configResult = _a.sent();
                console.log('Config Result: ', configResult);
                return [4 /*yield*/, testCachePerformance(redisClient)];
            case 4:
                performanceMetrics = _a.sent();
                res.json(performanceMetrics);
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.error('Error during Redis operations: ', error_1);
                res.status(500).send('Error during Redis operations');
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.get('/api/test', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.status(200).json('test');
        return [2 /*return*/];
    });
}); });
function testCachePerformance(redisClient) {
    return __awaiter(this, void 0, void 0, function () {
        var sampleData, ttl, start, _i, sampleData_1, key, hits, misses, i, key, result, end, duration;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sampleData = Array.from({ length: 10000 }, function (_, i) { return "key".concat(i); });
                    ttl = 60 * 60;
                    start = perf_hooks_1.performance.now();
                    _i = 0, sampleData_1 = sampleData;
                    _a.label = 1;
                case 1:
                    if (!(_i < sampleData_1.length)) return [3 /*break*/, 4];
                    key = sampleData_1[_i];
                    return [4 /*yield*/, redisClient.set(key, "value".concat(key), 'EX', ttl)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    hits = 0;
                    misses = 0;
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < 20000)) return [3 /*break*/, 8];
                    key = "key".concat(Math.floor(Math.random() * 10000));
                    return [4 /*yield*/, redisClient.get(key)];
                case 6:
                    result = _a.sent();
                    if (result !== null) {
                        hits++;
                    }
                    else {
                        misses++;
                    }
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8:
                    end = perf_hooks_1.performance.now();
                    duration = (end - start) / 1000;
                    console.log('Duration: ', duration);
                    console.log('hits: ', hits);
                    console.log('misses: ', misses);
                    return [4 /*yield*/, redisClient.quit()];
                case 9:
                    _a.sent();
                    return [2 /*return*/, { duration: duration, hits: hits, misses: misses }];
            }
        });
    });
}
app.listen(PORT, function () { return console.log("server is listening on port ".concat(PORT)); });
