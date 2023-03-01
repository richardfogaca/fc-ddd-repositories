"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
class Customer {
    constructor(id, name) {
        this._active = false;
        this._id = id;
        this._name = name;
        this.validate();
    }
    validate() {
        if (this._id.length === 0) {
            throw new Error("ID is required");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
    }
    get name() {
        return this._name;
    }
    isActive() {
        return this._active;
    }
    changeName(name) {
        this._name = name;
        this.validate();
    }
    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }
    deactivate() {
        this._active = false;
    }
    set Address(address) {
        this._address = address;
    }
}
exports.Customer = Customer;
