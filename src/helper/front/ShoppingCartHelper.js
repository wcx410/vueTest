const data=[

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
