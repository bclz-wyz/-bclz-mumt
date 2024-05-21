import { prop } from '@typegoose/typegoose';
import { Base } from './base';

export class User extends Base {
  /**
   * 用户游戏ID
   */
  @prop({ type: () => String, unique: true, required: true })
  public userId: string;

  /**
   * 用户QQ
   * @type {string}
   * @memberof User
   * @description 用户绑定的QQ
   */
  @prop({ type: () => String, unique: true, required: true })
  public qNumber!: string; // QQ号

  /**
   * 创建人id
   * @type {string}
   * @memberof User
   * @description 创建人
   */
  @prop({ type: () => String, required: true })
  public createBy: string;

  /**
   * 用户状态：0-正常，1-停用
   * @type {number}
   * @memberof User
   * @description 0-正常，1-停用
   */
  @prop({ type: () => String, default: '0' })
  public status?: '0' | '1';

  /**
   * 计费模式 0-按次，1-按时间
   */
  @prop({ type: () => String, default: '1' })
  public billingMode?: '0' | '1';

  /**
   * 剩余次数
   * @type {number}
   * @memberof User
   * @description 仅在计费模式为2时有效
   */
  @prop({ type: () => Number, default: 0 })
  public surplusCount?: number;

  /**
   * 到期时间
   * @type {string}
   * @memberof User
   * @description 仅在计费模式为3时有效
   */
  @prop({
    type: () => String,
    default: new Date().valueOf().toString().substring(0, 13),
  })
  public expireTime?: string;

  /**
   * 每日使用次数
   * @type {number}
   * @memberof User
   * @description 每次调用时判断天数是否相同，不同则重置为0
   */
  @prop({ type: () => Number, default: 0 })
  public useCount?: number;

  /**
   * 最后登陆时间
   * @type {string}
   * @memberof User
   * @description 最后一次登陆时间
   */
  @prop({
    type: () => String,
    default: new Date().valueOf().toString().substring(0, 13),
  })
  public lastLoginTime?: string;

  /**
   * 注册时间
   * @type {string}
   * @memberof User
   * @description 注册时间
   */
  @prop({
    type: () => String,
    default: new Date().valueOf().toString().substring(0, 13),
  })
  public registerTime?: string;
}
