"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("./order");
const order_item_1 = require("./order_item");
describe('Order unit tests', () => {
    it('should throw error when id is empty', () => {
        expect(() => new order_1.Order('', '1', [])).toThrowError('ID is required');
    });
    it('should throw error when customer id is empty', () => {
        expect(() => new order_1.Order('1', '', [])).toThrowError('Customer ID is required');
    });
    it('should throw error when items is empty', () => {
        expect(() => new order_1.Order('1', '1', [])).toThrowError('Order must have at least one item');
    });
    it('should calculate total', () => {
        const item = new order_item_1.OrderItem('i1', 'p1', 'item 1', 100, 2);
        const item2 = new order_item_1.OrderItem('i2', 'p2', 'item 2', 200, 2);
        const order = new order_1.Order('o1', 'c1', [item, item2]);
        const order2 = new order_1.Order('o2', 'c2', [item2]);
        expect(order.total()).toBe(600);
        expect(order2.total()).toBe(400);
    });
    it('should throw error if item quantity is less or equal to zero', () => {
        expect(() => {
            const item = new order_item_1.OrderItem('i1', 'p1', 'item 1', 100, 0);
            const order = new order_1.Order('o1', 'c1', [item]);
        }).toThrowError('Quantity must be greater than zero');
    });
});
