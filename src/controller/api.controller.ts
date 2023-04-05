import { Inject, Controller, Get, Query, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { User } from '../entity/user';
import { IRechargeTimeOptions } from '../interface';

@Controller('/api/users')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  /**
   * 添加用户
   * @param data
   * @returns
   */
  @Post('/create_user')
  async addUser(@Body() data: User) {
    console.log('data', data);
    const user = await this.userService.createUser(data);
    return {
      success: user.success || false,
      message: user.message || 'OK',
      data: user.data,
    };
  }

  /**
   * 充值剩余时间
   */
  @Post('/recharge_time')
  async rechargeTime(@Body() data: IRechargeTimeOptions) {
    const res = await this.userService.rechargeTime(data);
    // 判断是否更新成功
    return {
      success: res.success || false,
      message: res.message || 'OK',
      data: res.data,
    };
  }

  /**
   * 获取用户信息
   */
  @Get('/get_user_info')
  async getUserInfo(@Query('qNumber') qNumber) {
    const res = await this.userService.getUserInfo({ qNumber });
    return {
      success: res.success || false,
      message: res.message || 'OK',
      data: res.data,
    };
  }
}
