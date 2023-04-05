import { Provide } from '@midwayjs/core';
import { IRechargeTimeOptions, IUserOptions } from '../interface';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../entity/user';
import { LzResponse } from '../utils';

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
    if (targetUser) {
      res.data = targetUser;
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
  async updateUserInfo(options: IUserOptions) {
    const res = new LzResponse();
    const { qNumber, ...rest } = options;
    const targetUser = await this.userModel.findOneAndUpdate({ qNumber }, rest);
    if (targetUser) {
      res.data = targetUser;
    } else {
      res.success = false;
      res.message = '用户不存在';
    }
    return res;
  }
}
