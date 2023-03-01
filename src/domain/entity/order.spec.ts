import { Order } from "./order";
import { OrderItem } from "./order_item";

describe('Order unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => new Order('', '1', [])).toThrowError('ID is required');
  });

  it('should throw error when customer id is empty', () => {
    expect(() => new Order('1', '', [])).toThrowError('Customer ID is required');
  });

  it('should throw error when items is empty', () => {
    expect(() => new Order('1', '1', [])).toThrowError('Order must have at least one item');
  });

  it('should calculate total', () => {
    const item = new OrderItem('i1', 'p1', 'item 1', 100, 2);
    const item2 = new OrderItem('i2', 'p2', 'item 2', 200, 2);
    const order = new Order('o1', 'c1', [item, item2]);
    const order2 = new Order('o2', 'c2', [item2]);
    expect(order.total()).toBe(600);
    expect(order2.total()).toBe(400);
  });

  it('should throw error if item quantity is less or equal to zero', () => {
  expect(() => {
      const item = new OrderItem('i1', 'p1', 'item 1', 100, 0);
      const order = new Order('o1', 'c1', [item]);
    }).toThrowError('Quantity must be greater than zero');
  });
});