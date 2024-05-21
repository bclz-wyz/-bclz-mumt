/**
 * 任务类型
 * 1. 金币任务
 * 2. 日常任务
 */
export enum TaskType {
  Gold = 1,
  Daily = 2,
}

/**
 * 任务状态
 * 1. 未开始
 * 2. 进行中
 * 3. 已完成
 */
export enum TaskStatus {
  NotStarted = 1,
  InProgress = 2,
  Completed = 3,
}

/**
 * 获取定时任务信息的选项
 */
export interface GetTaskInfoOptions {
  taskId?: string;
  piaxiId: string;
}
