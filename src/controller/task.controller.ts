import {
  Provide,
  Controller,
  Inject,
  Post,
  Get,
  Body,
  Param,
  Context,
} from '@midwayjs/core';
import { TaskService } from '../service/task.service';
import { Task } from '../entity/tasks';
import { GetTaskInfoOptions, TaskStatus } from '../interface/task';

@Provide()
@Controller('/api/task')
/**
 * Controller class for managing tasks.
 */
export class TaskController {
  @Inject()
  ctx: Context;

  @Inject()
  taskService: TaskService;

  /**
   * Creates a new task.
   * @param data - The task data.
   * @returns The created task.
   */
  @Post('/create')
  async createTask(@Body() data: Task) {
    return await this.taskService.createTask(data);
  }

  /**
   * Retrieves information about a specific task.
   * @param options - The options for retrieving task information.
   * @returns The task information.
   */
  @Get('/:taskId')
  async getTaskInfo(@Param() options: GetTaskInfoOptions) {
    return await this.taskService.getTaskInfo(options);
  }

  /**
   * 查看所有任务
   * @returns 所有任务
   */
  @Get('/all')
  async getAllTasks() {
    return await this.taskService.getAllTasks();
  }

  /**
   * 查询进行中的任务
   */
  @Get('/running')
  async getRunningTasks(taskStatus: TaskStatus = TaskStatus.InProgress) {
    return await this.taskService.findInProgressTask(taskStatus);
  }
}
