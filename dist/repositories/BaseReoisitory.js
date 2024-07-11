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
class BaseRepository {
    //   protected prisma: PrismaClient;
    constructor(model) {
        this.model = model;
        // this.prisma = new PrismaClient();
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.create({ data });
        });
    }
    createMany(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.createMany({ data });
        });
    }
    findMany(where) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findMany({ where });
        });
    }
    findOne(where) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findUnique({ where });
        });
    }
    findById(where) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findUnique({ where });
        });
    }
    update(where, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.update({ where, data });
        });
    }
    //for soft delete deleteAt is added to the model and then filter by it using qauery
    softDelete(where) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.update({ where, data: { deletedAt: new Date() } });
        });
    }
    deepDelete(where) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.delete({ where });
        });
    }
    deleteOne(where) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.model.findUnique({ where });
            if (entity) {
                yield this.model.delete({ where });
            }
            return entity;
        });
    }
    deleteMany(where) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.deleteMany({ where });
        });
    }
}
exports.default = BaseRepository;
