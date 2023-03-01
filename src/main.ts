import { Address } from "./domain/entity/address";
import { Customer } from "./domain/entity/customer";
import { Order } from "./domain/entity/order";
import { OrderItem } from "./domain/entity/order_item";

const customer = new Customer("123", "Richard Fogaca");
const address = new Address("Rua 1", "123", "São Paulo", "SP");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "pid1", 'shirt', 10, 2);
const item2 = new OrderItem("2", "pid2", 'dress', 15, 3);

const order = new Order("1", "123", [item1, item2]);
