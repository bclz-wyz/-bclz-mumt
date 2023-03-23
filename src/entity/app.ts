import { prop } from '@typegoose/typegoose';

export class App {
  // 应用名称
  @prop({ type: () => String })
  public appName?: string;

  // 应用ID
  @prop({ type: () => String })
  public appId?: string;

  // 创建时间
  @prop({ type: () => String })
  public createTime?: string;

  // 每日免费次数
  @prop({ type: () => Number })
  public freeCount?: number;

  /**
   * 当前状态：0-正常，1-停用
   */
  @prop({ type: () => 0 | 1 | 2 })
  public status?: 0 | 1 | 2;
}
