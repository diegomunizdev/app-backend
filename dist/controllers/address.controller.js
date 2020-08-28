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
exports.deleteAddress = exports.updateAddress = exports.getAddress = exports.createAddress = void 0;
const response_1 = require("../middlewares/response");
const address_model_1 = __importDefault(require("../models/user.data/address.model"));
const address_validator_1 = require("../validators/address.validator");
exports.createAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = new address_model_1.default(req.body);
        if (!address)
            response_1.responseError(res, 'Unable to save address', 400);
        // TODO: Validando os dados de endereço
        address_validator_1.ValidateAddress.validate(address);
        yield address.save();
        response_1.responseSuccess(res, address, 201);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.getAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield address_model_1.default.findOne({ user_id: req.params.userId });
        if (!user)
            response_1.responseError(res, 'Address not found', 400);
        response_1.responseSuccess(res, user, 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.updateAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addr = yield address_model_1.default.findOne({ user_id: req.params.userId });
        if (!addr)
            response_1.responseError(res, 'Address not found', 400);
        const address = {
            zip_code: req.body.zip_code,
            name: req.body.name,
            complement: req.body.complement,
            number: req.body.number,
            neighborhood: req.body.neighborhood,
            city: req.body.city
        };
        yield address_model_1.default.findByIdAndUpdate(addr ? addr.id : '', {
            $set: address
        }, { new: true });
        response_1.responseSuccess(res, addr, 201);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
exports.deleteAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addr = yield address_model_1.default.findOne({ user_id: req.params.userId });
        if (!addr)
            response_1.responseError(res, 'Address not found', 400);
        const deleteAddress = yield address_model_1.default.findByIdAndRemove(addr ? addr.id : '');
        if (!deleteAddress)
            response_1.responseError(res, 'Has not been removed', 400);
        response_1.responseSuccess(res, 'Address successfully removed', 200);
    }
    catch (error) {
        response_1.responseError(res, error);
    }
});
//# sourceMappingURL=address.controller.js.map