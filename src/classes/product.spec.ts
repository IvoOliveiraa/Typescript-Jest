import { Product } from './product';

const createSut = (name: string, price: number): Product => {
  return new Product(name, price);
};

describe('Product', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have properties name and price', () => {
    const sut = createSut('camiseta', 49.9);
    expect(sut).toHaveProperty('name', 'camiseta');
    expect(sut.price).toBeCloseTo(49.9);
  });
});
