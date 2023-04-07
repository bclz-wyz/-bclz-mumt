import { Inject, Controller, Get, Query, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { User } from '../entity/user';
import { IRechargeTimeOptions } from '../interface';
import { CardService } from '../service/card.service';
import { LzResponse } from '../utils';
import { Card } from '../entity/card';

@Controller('/api/users')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  cardService: CardService;

  /**
   * 添加用户
   * @param data
   * @returns
   */
  @Post('/create_user')
  async addUser(@Body() data: User) {
    // console.log('data', data);
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

  /**
   * 更新用户信息
   */
  @Post('/update_user_info')
  async updateUserInfo(@Body() data: User) {
    const res = await this.userService.updateUserInfo(data);
    return {
      success: res.success || false,
      message: res.message || 'OK',
      data: res.data,
    };
  }

  /**
   * 用户充值接口，先调用rechargeCard，再调用用户充值接口
   */
  @Post('/recharge_user')
  async rechargeUser(@Body() data: { cardId: string; qNumber: string }) {
    const cardInfo = (await this.cardService.rechargeCard({
      id: data.cardId,
      qNumber: data.qNumber,
    })) as LzResponse<Card>;

    if (!cardInfo.success) {
      return {
        ...cardInfo,
      };
    } else {
      const res = await this.userService.rechargeTime({
        qNumber: data.qNumber,
        time: cardInfo.data.parValue!,
      });
      return {
        success: res.success || false,
        message: res.message || 'OK',
        data: res.data,
      };
    }
  }
}
