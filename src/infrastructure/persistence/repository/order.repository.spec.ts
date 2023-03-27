import { Sequelize } from "sequelize-typescript";
import { Customer } from "../../../domain/entity/customer";
import { Address } from "../../../domain/entity/address";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";
import { Product } from "../../../domain/entity/product";
import { OrderItem } from "../../../domain/entity/order_item";
import { Order } from "../../../domain/entity/order";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer1");
    const address = new Address("Main Street", 1, "New York", "12345");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2,
    );
    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should find an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer1");
    const address = new Address("Main Street", 1, "New York", "12345");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2,
    );
    const orderRepository = new OrderRepository();
    const order = new Order("123", "123", [orderItem]);
    await orderRepository.create(order);

    const orderModel = await orderRepository.findOne(order.id);
    expect(orderModel).toStrictEqual(order);
  });

  it("should update an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer1");
    const address = new Address("Main Street", 1, "New York", "12345");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2,
    );
    const orderRepository = new OrderRepository();
    const order = new Order("123", "123", [orderItem]);
    await orderRepository.create(order);

    const newOrderItem = new OrderItem(
      "2",
      product.id,
      product.name,
      product.price,
      3,
    );
    order.addItem(newOrderItem);
    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    // TODO: orders is updated but orderModel is not, find out why
    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
        {
          id: newOrderItem.id,
          name: newOrderItem.name,
          price: newOrderItem.price,
          quantity: newOrderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer1");
    const address = new Address("Main Street", 1, "New York", "12345");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2,
    );
    const orderRepository = new OrderRepository();
    const order = new Order("123", "123", [orderItem]);
    await orderRepository.create(order);

    const product2 = new Product("456", "Product2", 20);
    await productRepository.create(product2);

    const orderItem2 = new OrderItem(
      "2",
      product2.id,
      product2.name,
      product2.price,
      3,
    );
    const order2 = new Order("456", "123", [orderItem2]);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();
    expect(orders).toStrictEqual([order, order2]);
  });
});
