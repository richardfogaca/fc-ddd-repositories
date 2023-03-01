"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
class OrderItem {
    constructor(id, productId, name, price, quantity) {
        this._id = id;
        this._productId = productId;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
    }
    get price() {
        return this._price;
    }
    get quantity() {
        return this._quantity;
    }
}
exports.OrderItem = OrderItem;
