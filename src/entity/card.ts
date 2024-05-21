import { prop } from '@typegoose/typegoose';
import { Base } from './base';

/**
 * 卡密
 * @export
 * @class Card
 * @description 卡密
 * @property {string} id 卡密ID是，默认值为32位随机字符串，必传
 * @property {string} type 卡密类型,1-按次，2-按时间，必传
 * @property {string} status 卡密状态,0-未使用，1-已使用，2-禁用,必传
 * @property {string} createBy 卡密创建人，必传
 * @property {string} userId 卡密使用人，必传
 * @property {string} createTime 卡密创建时间,默认值为当前时间的时间戳，不包含毫秒，必传
 * @property {string} useTime 卡密使用时间，不包含毫秒。默认值0，必传
 * @property {string} parValue  卡密面值，必传
 */
export class Card extends Base {
  /**
   * 卡密ID
   * @type {string}
   * @memberof Card
   * @description 卡密ID是，默认值为32位随机字符串
   */
  @prop({ type: () => String, unique: true, required: true })
  public id: string;

  /**
   * 卡密类型
   * @type {string}
   * @memberof Card
   * @description 卡密类型,1-按次，2-按时间
   * @default 1
   * @example 1
   * @example 2
   */
  @prop({ type: () => String, default: 1 })
  public type?: string;

  /**
   * 卡密状态
   * @type {number}
   * @memberof Card
   * @description 卡密状态,0-未使用，1-已使用，2-禁用
   * @default 0
   * @example 0
   * */
  @prop({ type: () => String, default: 0 })
  public status?: string;

  /**
   * 卡密创建人
   * @type {string}
   * @memberof Card
   * @description 卡密创建人
   * @example 0
   * */
  @prop({ type: () => String, required: true })
  public createBy: string;

  /**
   * 卡密使用人
   * @type {string}
   * @memberof Card
   * @description 卡密使用人
   * @example 0
   * */
  @prop({ type: () => String, default: '' })
  public userId?: string;

  /**
   * 卡密创建时间
   * @type {string}
   * @memberof Card
   * @description 卡密创建时间,默认值为当前时间的时间戳，含毫秒
   * @example 0
   * */

  /**
   * 卡密使用时间
   * @type {string}
   * @memberof Card
   * @description 卡密使用时间，不包含毫秒。默认值0
   * @example 0
   * */
  @prop({ type: () => String, default: '0' })
  public useTime?: string;

  /**
   * 卡密面值
   * @type {string}
   * @memberof Card
   * @description 卡密面值
   * @example 0
   * */
  @prop({ type: () => String, required: true })
  public parValue: string;
}
