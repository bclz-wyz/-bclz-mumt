import { prop } from '@typegoose/typegoose';

/**
 * 接口基础类型
 * @class Base
 * @description 接口基础类型，包含：创建人id、创建时间、更新时间
 *
 */

export class Base {
  /**
   * 创建人id
   * @type {string}
   * @memberof Base
   * @description 创建人id
   */
  @prop({ type: () => String, required: true })
  public createBy: string;

  /**
   * 创建时间
   * @type {string}
   * @memberof Base
   * @description 创建时间
   */
  @prop({
    type: () => String,
    default: new Date().valueOf().toString().substring(0, 13),
  })
  public createTime: string;

  /**
   * 更新时间
   * @type {string}
   * @memberof Base
   * @description 更新时间
   */
  @prop({
    type: () => String,
    default: new Date().valueOf().toString().substring(0, 13),
  })
  public updateTime: string;
}
