import { Customer } from "../entity/customer";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/order_item";
import { OrderService } from "./order.service";

describe('Order service unit tests', () => {

  it('should place an order', () => {
    const customer = new Customer('c1', 'John');
    const item = new OrderItem('i1', 'pid1', 'Order 1', 100, 1);

    const order = OrderService.placeOrder(customer, [item]);

    expect(customer.rewardPoints).toBe(50);
    expect(order.total()).toBe(100);
  });

  it('should get total of all orders', () => {
    const item1 = new OrderItem('i1', 'pid1', 'Order 1', 100, 1);
    const item2 = new OrderItem('i2', 'pid2', 'Order 2', 200, 2);

    const order1 = new Order('o1', 'c1', [item1]);
    const order2 = new Order('o2', 'c2', [item2]);

    const total = OrderService.total([order1, order2]);
    expect(total).toBe(500);
  });
});
