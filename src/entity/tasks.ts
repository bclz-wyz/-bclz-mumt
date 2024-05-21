import { prop } from '@typegoose/typegoose';
import { Base } from './base';
import { v4 as uuidv4 } from 'uuid';
import { TaskStatus, TaskType } from '../interface/task';

/**
 * 定时任务表
 * @class Task
 * @description 定时任务表，包含：任务类型、任务状态、任务开始时间、任务执行时间、任务结束时间、任务执行结果、任务id、任务创建人(piaxiId)、任务创建时间、任务更新时间
 * @example
 */

export class Task extends Base {
  /**
   * 任务id
   * @type {string}
   * @memberof Task
   * @description 任务id
   */
  @prop({ type: () => String, unique: true, required: true, default: uuidv4() })
  public taskId: string;

  /**
   * pixxiId
   * @type {string}
   * @memberof Task
   */
  @prop({ type: () => String, required: true })
  public piaxiId: string;

  /**
   * 任务类型
   * @type {TaskType}
   * @memberof Task
   * @description 任务类型
   */
  @prop({ type: () => Number, required: true })
  public taskType: TaskType;

  /**
   * 任务状态
   * @type {TaskStatus}
   * @memberof Task
   * @description 任务状态
   */
  @prop({ type: () => Number, required: false, default: TaskStatus.NotStarted })
  public taskStatus: TaskStatus;

  /**
   * 任务开始时间
   * @type {string}
   * @memberof Task
   * @description 任务开始时间
   */
  @prop({ type: () => String, required: false })
  public taskStartTime: string;

  /**
   * 任务执行时间
   * @type {string}
   * @memberof Task
   * @description 任务执行时间
   */
  @prop({ type: () => String, required: false })
  public taskExecuteTime: string;

  /**
   * 任务结束时间
   * @type {string}
   * @memberof Task
   * @description 任务结束时间
   */
  @prop({ type: () => String, required: false })
  public taskEndTime: string;

  /**
   * 任务执行结果
   * @type {string}
   * @memberof Task
   * @description 任务执行结果
   */
  @prop({ type: () => String, required: false, default: '' })
  public taskResult: string;
}
