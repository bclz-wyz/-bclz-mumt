import { Provide } from '@midwayjs/core';
import { IRechargeTimeOptions, IUserOptions } from '../interface';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../entity/user';
import { LzResponse, isSameDay } from '../utils';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  async createUser(options: User) {
    const res = new LzResponse();
    const targetUser = await this.userModel.create(options);
    return {
      success: res.success || false,
      message: res.message || '用户创建失败',
      data: targetUser,
    };
  }

  /**
   * 用户剩余时间充值
   */
  async rechargeTime(options: IRechargeTimeOptions) {
    const res = new LzResponse();
    const { qNumber, time } = options;
    const targetUser = await this.userModel.findOne({ qNumber: qNumber });
    if (targetUser) {
      targetUser.expireTime = (
        Number(targetUser.expireTime) + Number(time)
      ).toString();
      res.data = await targetUser.save();
    } else {
      res.success = false;
      res.message = '用户不存在';
    }
    return res;
  }

  /**
   * 获取用户信息
   */
  async getUserInfo(options: IUserOptions) {
    const res = new LzResponse();
    const { qNumber } = options;
    const targetUser = await this.userModel.findOne({ qNumber: qNumber });
    // console.log('targetUser', targetUser);
    if (targetUser) {
      /**
       * 判断当前时间和上次使用时间，如果不是同一天则清空已用次数
       */
      const today = new Date().valueOf().toString();
      const { lastLoginTime } = targetUser;
      const shouldClearCount = !isSameDay(
        today,
        (Number(lastLoginTime) * 1000).toString()
      );
      // 如果不是同一天，则更新
      if (shouldClearCount) {
        targetUser.useCount = 0;
        res.data = await targetUser.save();
        // console.log('非同一天', today, lastLoginTime, res.data);
      } else {
        res.data = targetUser;
      }
    } else {
      res.success = false;
      res.message = '用户不存在';
    }
    return res;
  }

  /**
   * 更新用户信息
   * @param options
   * @returns
   * @example
   * */
  async updateUserInfo(options: User) {
    const res = new LzResponse();
    const { qNumber, ...rest } = options;

    // console.log('options', rest);

    let targetUser = await this.userModel.findOne({ qNumber });

    Object.entries(rest).forEach(item => {
      const [key, value] = item;
      targetUser[key] = value;
    });

    targetUser = await targetUser.save();

    if (targetUser) {
      res.data = targetUser;
    } else {
      res.success = false;
      res.message = '用户不存在';
    }
    return res;
  }
}
