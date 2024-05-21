import { prop } from '@typegoose/typegoose';
import { Base } from './base';

/**
 * 用户绑定的客户端类型
 * 1. QQ
 * 2. 微信
 * 3. 手机号
 */
export enum ClientEnum {
  QQ = 1,
  WeChat = 2,
  Phone = 3,
}

export type ClientType = keyof typeof ClientEnum;

/**
 * piaxi账号token状态
 */
export enum TokenStatus {
  /**
   * 正常
   */
  Normal = 0,
  /**
   * 异常
   */
  Abnormal = 1,
}

export type TokenStatusType = keyof typeof TokenStatus;

/**
 * pia戏账号的用户信息
 * @class Piaxi
 * @description pia戏账号的用户信息
 * @property {string} id 用户ID，piaxi账号的唯一标识
 * @property {string} clientName 绑定的用户名
 * @property {ClientEnum} clientType 绑定的客户端类型  1. QQ 2. 微信 3. 手机号
 * @property {string} createTime 创建时间
 * @property {string} updateTime 更新时间
 * @property {string} createBy 创建人ID
 * @property {TokenStatus} status 当前状态：0-正常，1-异常
 * @property {string} token token令牌
 */

// 参考：./src/entity/user.ts文件，补全Piaxi类
export class Piaxi extends Base {
  /**
   * 用户ID，piaxi账号的唯一标识
   * @type {string}
   * @memberof Piaxi
   * @description 用户ID，piaxi账号的唯一标识
   */
  @prop({ type: () => String, unique: true, required: true })
  public id: string;

  /**
   * 绑定的用户名
   * @type {string}
   * @memberof Piaxi
   * @description 绑定的用户名
   */
  @prop({ type: () => String, required: true })
  public clientName: string;

  /**
   * 绑定的客户端类型
   * @type {ClientEnum}
   * @memberof Piaxi
   * @description 绑定的客户端类型
   */
  @prop({ type: () => Number, required: true })
  public clientType: ClientEnum;

  /**
   * 当前状态：0-正常，1-异常
   * @type {TokenStatus}
   * @memberof Piaxi
   * @description 当前状态：0-正常，1-异常
   */
  @prop({ type: () => Number, required: false, default: TokenStatus.Normal })
  status?: TokenStatus;

  /**
   * token令牌
   * @type {string}
   * @memberof Piaxi
   * @description token令牌
   */
  @prop({ type: () => String, required: true })
  public token: string;
}
