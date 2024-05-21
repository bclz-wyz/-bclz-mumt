/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  qNumber: string;
}

/**
 * 用户充值时间参数
 */
export interface IRechargeTimeOptions {
  qNumber: string;
  time: string;
}

/**
 * 根据card.controller.ts文件，实现的接口
 */
export interface ICardOptions {
  qNumber: string;

  /**
   * 卡号
   * @type {string}
   * @memberof ICardOptions
   * @description 卡号
   * @example 0
   * */
  cardId: string;
}

/**
 * 批量创建卡密的参数：具体参数如下
 * @param {number} count 卡密数量
 * @param {number} type 卡密类型
 * @param {string} createBy 创建人id
 * @param {string} parValue 卡密面值
 *
 */
export interface IBatchCreateCardOptions {
  count: number;
  type: number;
  createBy: string;
  parValue: string;
}
