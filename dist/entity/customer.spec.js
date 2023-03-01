"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = require("./address");
const customer_1 = require("./customer");
describe('Customer unit tests', () => {
    it('should throw error when id is empty', () => {
        expect(() => new customer_1.Customer('', 'John')).toThrowError('ID is required');
    });
    it('should throw error when name is empty', () => {
        expect(() => new customer_1.Customer('1', '')).toThrowError('Name is required');
    });
    it('should change name', () => {
        // Arrange
        const customer = new customer_1.Customer('1', 'John');
        // Act
        customer.changeName('John Doe');
        // Assert
        expect(customer.name).toBe('John Doe');
    });
    it('should activate customer', () => {
        const customer = new customer_1.Customer('1', 'John');
        const address = new address_1.Address('street', 'city', 'state', 'zip');
        customer.Address = address;
        customer.activate();
        expect(customer.isActive()).toBe(true);
    });
    it('should deactivate customer', () => {
        const customer = new customer_1.Customer('1', 'John');
        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    });
    it('should throw error when address is undefined', () => {
        expect(() => {
            const customer = new customer_1.Customer('1', 'John');
            customer.activate();
        }).toThrowError('Address is mandatory to activate a customer');
    });
});
