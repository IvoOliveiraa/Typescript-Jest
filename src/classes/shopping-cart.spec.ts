import { Discount } from './discount';
import { CartItem } from './interface/cart-item';
import { ShoppingCart } from './shopping-cart';

const creatSut = () => {
  const discountMock = creatDiscountMock();
  const sut = new ShoppingCart(discountMock);
  return { sut, discountMock };
};

const creatDiscountMock = () => {
  class DiscountMock extends Discount {}
  return new DiscountMock();
};

const creatCartItem = (name: string, price: number) => {
  class CartItemMock implements CartItem {
    constructor(
      public name: string,
      public price: number,
    ) {}
  }
  return new CartItemMock(name, price);
};

const createSutWithDiscount = () => {
  const { sut, discountMock } = creatSut();
  const cartItem1 = creatCartItem('camiseta', 40);
  const cartItem2 = creatCartItem('caneta', 1);
  sut.addItem(cartItem1);
  sut.addItem(cartItem2);
  return { sut, discountMock };
};

describe('Shopping cart', () => {
  it('Should be an empty cart when no product is added', () => {
    const { sut } = creatSut();
    expect(sut.isEmpty()).toBe(true);
  });

  it('Should have 2 cart items', () => {
    const { sut } = createSutWithDiscount();
    expect(sut.items.length).toBe(2);
  });

  it('Should test total and totalWithDiscount', () => {
    const { sut } = createSutWithDiscount();
    expect(sut.total()).toBe(41);
    expect(sut.totalWithDiscount()).toBe(41);
  });

  it('Should add products and clear cart', () => {
    const { sut } = createSutWithDiscount();
    expect(sut.items.length).toBe(2);
    sut.clear();
    expect(sut.items.length).toBe(0);
    expect(sut.isEmpty()).toBe(true);
  });

  it('Should remove products', () => {
    const { sut } = createSutWithDiscount();
    expect(sut.items.length).toBe(2);
    sut.removeItem(1);
    expect(sut.items.length).toBe(2);
  });
});
