// 参照 ./src/entity/task.entity.ts 中的 Task类，完成 TaskService类中的方法

import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Task } from '../entity/tasks';
import { GetTaskInfoOptions, TaskStatus } from '../interface/task';
import { LzResponse } from '../utils';
import { Piaxi } from '../entity/piaxi';

@Provide()
export class TaskService {
  @InjectEntityModel(Task)
  taskModel: ReturnModelType<typeof Task>;
  piaxiModel: ReturnModelType<typeof Piaxi>;

  /**
   * 创建一个新的定时任务
   * @param data - 新定时任务的数据
   * @returns 包含成功状态、消息和创建的定时任务的对象
   */
  async createTask(data: Task) {
    const res = new LzResponse<Task>();
    const targetTask = await this.taskModel.create(data);
    if (targetTask?.taskId === data.taskId) {
      res.data = targetTask;
    } else {
      res.success = false;
      res.message = '定时任务创建失败';
    }
    return res;
  }

  /**
   * 获取定时任务信息
   * @param options - 获取定时任务的选项
   * @param options.taskId - 要获取的定时任务的ID
   * @param options.piaxiId - 要获取的定时任务的piaxiId
   * @returns 包含成功状态、消息和定时任务信息的响应对象
   */
  async getTaskInfo(options: GetTaskInfoOptions) {
    const res = new LzResponse();
    const { taskId, piaxiId } = options;
    const targetTask = await this.taskModel.findOne({
      taskId,
      piaxiId,
    });
    if (targetTask) {
      res.data = targetTask;
    } else {
      res.success = false;
      res.message = '定时任务不存在';
    }
    return res;
  }

  /**
   * 更新定时任务信息
   * @param options - 更新定时任务的选项
   * @param options.taskId - 要更新的定时任务的ID
   * @param options.piaxiId - 要更新的定时任务的piaxiId
   * @param data - 更新的定时任务数据
   * @returns 包含成功状态、消息和更新后的定时任务的对象
   */
  async updateTaskInfo(options: Task, data: Task) {
    const res = new LzResponse<Task>();
    const { taskId, piaxiId } = options;
    const targetTask = await this.taskModel.findOneAndUpdate(
      {
        taskId,
        piaxiId,
      },
      data,
      {
        new: true,
      }
    );
    if (targetTask) {
      res.data = targetTask;
    } else {
      res.success = false;
      res.message = '定时任务不存在';
    }
    return res;
  }

  /**
   * 查找状态为进行中的任务
   * @param taskStatus - 要查找的任务的piaxiId
   * @returns 包含成功状态、消息和查找到的任务的对象
   */
  async findInProgressTask(taskStatus: TaskStatus) {
    const res = new LzResponse<Task[]>();
    const targetTask = await this.taskModel.find({
      taskStatus,
    });
    if (targetTask) {
      res.data = targetTask;
    } else {
      res.success = true;
      res.data = [];
    }
    return res;
  }

  /**
   * 查询所有任务
   */
  async getAllTasks() {
    const res = new LzResponse<Task[]>();
    const tasks = await this.taskModel.find();
    if (tasks) {
      res.data = tasks;
    } else {
      res.success = false;
      res.message = '查询所有任务失败';
    }
    return res;
  }

  /**
   * 根据piaxi表中的所有用户创建任务
   */
  async createTasksByPiaxi() {
    const res = new LzResponse<Task[]>();
    const piaxis = await this.piaxiModel.find();
    if (piaxis) {
      const tasks = piaxis.map(piaxi => {
        return {
          piaxiId: piaxi.id,
          taskStatus: TaskStatus.InProgress,
        };
      });
      const createdTasks = await this.taskModel.create(tasks);
      if (createdTasks) {
        res.data = createdTasks;
      } else {
        res.success = false;
        res.message = '创建任务失败';
      }
    } else {
      res.success = false;
      res.message = '查询piaxi表失败';
    }
  }
}
