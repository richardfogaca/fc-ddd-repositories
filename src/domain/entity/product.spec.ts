import { Product } from "./product";

describe('Product unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const product = new Product('', 'Product 1', 100);
    }).toThrowError('ID is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      const product = new Product('1', '', 100);
    }).toThrowError('Name is required');
  });

  it('should throw error when price is less than or equal to zero', () => {
    expect(() => {
      const product = new Product('1', 'Product 1', 0);
    }).toThrowError('Price must be greater than zero');
  });

  it('should change name', () => {
    const product = new Product('1', 'Product 1', 100);
    product.changeName('Product 2');
    expect(product.name).toBe('Product 2');
  })

  it('should change price', () => {
    const product = new Product('1', 'Product 1', 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  });
});