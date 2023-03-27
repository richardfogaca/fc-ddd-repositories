import { Order } from "../../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderRepositoryInterface from "../../../domain/repository/order-repository.interface";
import { OrderItem } from "../../../domain/entity/order_item";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
      })),
    }, {
      include: [{ model: OrderItemModel }],
    });
  }

  async findOne(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        include: ["items"],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    const orderItems = orderModel.items.map(item => (
      new OrderItem(
        item.id,
        item.product_id,
        item.name,
        item.price,
        item.quantity,
    )));

    const order = new Order(
      orderModel.id,
      orderModel.customer_id,
      orderItems,
    );

    return order;
  }

  async update(entity: Order): Promise<void> {
    const orderModel = await OrderModel.findByPk(entity.id, {
      include: ["items"],
    });

    for (const item of entity.items) {
      if (!orderModel.items.some((i) => i.id === item.id)) {
        const newItem = await OrderItemModel.create({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          order_id: entity.id,
        });
        orderModel.items.push(newItem);
      }
    }
    orderModel.total = entity.total();
    orderModel.customer_id = entity.customerId;

    await orderModel.save();
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: ["items"],
    });

    const orders = orderModels.map(orderModel => {
      const orderItems = orderModel.items.map(item => (
        new OrderItem(
          item.id,
          item.product_id,
          item.name,
          item.price,
          item.quantity,
        )
      ));

      const order = new Order(
        orderModel.id,
        orderModel.customer_id,
        orderItems,
      );

      return order;
    });

    return orders;
  }
}
