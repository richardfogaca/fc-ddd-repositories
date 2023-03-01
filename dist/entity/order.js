"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    constructor(id, customerId, items) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }
    validate() {
        if (this._id.length === 0)
            throw new Error("ID is required");
        if (this._customerId.length === 0)
            throw new Error("Customer ID is required");
        if (this._items.length === 0)
            throw new Error("Order must have at least one item");
        if (this._items.some(item => item.quantity <= 0))
            throw new Error("Quantity must be greater than zero");
        return true;
    }
    total() {
        return this._items.reduce((total, item) => total + item.price * item.quantity, 0);
    }
}
exports.Order = Order;
