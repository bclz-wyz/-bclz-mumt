import { prop } from '@typegoose/typegoose';

export class User {
  /**
   * 用户游戏ID
   */
  @prop({ type: () => Number, unique: true })
  public userId: string;

  /**
   * 创建人id
   * @type {string}
   * @memberof User
   * @description 创建人
   */
  @prop({ type: () => String, required: true })
  public creatorId!: string;

  /**
   * 用户状态：0-正常，1-停用
   * @type {number}
   * @memberof User
   * @description 0-正常，1-停用
   */
  @prop({ type: () => Number, default: 0 })
  public status: 0 | 1;

  /**
   * 剩余次数
   * @type {number}
   * @memberof User
   * @description 仅在计费模式为2时有效
   */
  @prop({ type: () => Number })
  public surplusCount?: number;

  /**
   * 剩余时间
   * @type {string}
   * @memberof User
   * @description 仅在计费模式为3时有效
   */
  @prop({ type: () => String })
  public surplusTime?: string;

  /**
   * 用户QQ
   * @type {string}
   * @memberof User
   * @description 用户绑定的QQ
   */
  @prop({ type: () => String, unique: true })
  public qqNumber?: string; // QQ号

  /**
   * 用户密码
   * @type {string}
   * @memberof User
   * @description 用户密码
   */
  @prop({ type: () => String })
  public password?: string; // 密码

  /**
   * 每日使用次数
   * @type {number}
   * @memberof User
   * @description 仅在计费模式为2时有效
   */
  @prop({ type: () => Number })
  public useCount?: number;

  /**
   * 最后登陆时间
   * @type {string}
   * @memberof User
   * @description 最后一次登陆时间
   */
  @prop({ type: () => String })
  public lastLoginTime?: string;

  /**
   * 注册时间
   * @type {string}
   * @memberof User
   * @description 注册时间
   */
  @prop({ type: () => String })
  public registerTime?: string;
}
