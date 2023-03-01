import { Address } from "./address";
import { Customer } from "./customer";

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => new Customer('', 'John')).toThrowError('ID is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => new Customer('1', '')).toThrowError('Name is required');
  });

  it('should change name', () => {
    // Arrange
    const customer = new Customer('1', 'John');
    // Act
    customer.changeName('John Doe');
    // Assert
    expect(customer.name).toBe('John Doe');
  });

  it('should activate customer', () => {
    const customer = new Customer('1', 'John');
    const address = new Address('street', 'city', 'state', 'zip');
    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it('should deactivate customer', () => {
    const customer = new Customer('1', 'John');

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it('should throw error when address is undefined', () => {
    expect(() => {
      const customer = new Customer('1', 'John');
      customer.activate();
    }).toThrowError('Address is mandatory to activate a customer');
  });

  it('should add reward points', () => {
    const customer = new Customer('1', 'John');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(100);
    expect(customer.rewardPoints).toBe(100);

    customer.addRewardPoints(200);
    expect(customer.rewardPoints).toBe(300);
  });
});
