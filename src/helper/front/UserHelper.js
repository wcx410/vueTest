import Axios from "axios";

export class UserHelper{
  /**
   * 获取用户id
   */
  static  get userId(){
    console.log("获取UID = " + sessionStorage.getItem("uid"));
    return sessionStorage.getItem("uid");
  }

  /**
   * 设置用户id
   * @param uid
   */
  static set userId(uid){
    console.log("设置UID = " + uid);
    sessionStorage.setItem("uid",uid);
  }

  /**
   *获取商户id
   * @returns {string}
   */
  static get merId(){
    return sessionStorage.getItem("merId");
  }

  /**
   * 设置商户id
   * @param val
   */
  static set merId(val){
    sessionStorage.setItem("merId",val);
  }

  // static async getUser(id){
  //   $Axios.get("/user/get/"+(id ?? UserHelper.userId)).then(function (result) {
  //     return result.data;
  //   }).catch()
  // }
/*  static async getUser(id){
    $Axios.get("/user/get/"+(id ?? UserHelper.userId)).then(function (result) {
      return result.data;
    }).catch()
  }*/
}
