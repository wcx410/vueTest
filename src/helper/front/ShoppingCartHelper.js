const data=[
  {
    name: "西红柿",
    count: 2,
    image: './assets/logo.png',
    price: 1.5
  },
  {
    name: "西蓝花",
    count: 3,
    image: './assets/logo.png',
    price: 2.5
  },
  {
    name: "西蓝花",
    count: 3,
    image: './assets/logo.png',
    price: 2.5
  }
];

/**
 * 购物车Service
 */
export class ShoppingCartHelper{
  /**
   * 获取当前用户的购物车数据
   */
  getShoppingData(){
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data);
      },2000);
    })
  }
}
