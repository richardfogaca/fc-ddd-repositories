"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = require("./entity/address");
const customer_1 = require("./entity/customer");
const order_1 = require("./entity/order");
const order_item_1 = require("./entity/order_item");
const customer = new customer_1.Customer("123", "Richard Fogaca");
const address = new address_1.Address("Rua 1", "123", "São Paulo", "SP");
customer.Address = address;
customer.activate();
const item1 = new order_item_1.OrderItem("1", "Item 1", 10);
const item2 = new order_item_1.OrderItem("2", "Item 2", 15);
const order = new order_1.Order("1", "123", [item1, item2]);