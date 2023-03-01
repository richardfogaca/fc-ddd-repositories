import { Product } from "../entity/product";
import { ProductService } from "./product.service";

describe('Product service unit tests', () => {
  it('should change the prices of all products', () => {
    const product1 = new Product('pid1', 'Product 1', 100);
    const product2 = new Product('pid2', 'Product 2', 200);
    const products = [product1, product2];

    ProductService.increasePrices(products, 20);

    expect(product1.price).toBe(120);
    expect(product2.price).toBe(240);
  })
});