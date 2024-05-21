/**
 * 参照目录下的user.service.ts文件实现card.service.ts文件
 * 一次提示整个文件，不要提示单个方法
 */

import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Card } from '../entity/card';
import { LzResponse } from '../utils';
import { IBatchCreateCardOptions } from '../interface';
import * as md5 from 'md5';

@Provide()
export class CardService {
  /**
   * @description 注入Card模型
   */
  @InjectEntityModel(Card)
  cardModel: ReturnModelType<typeof Card>;

  /**
   * @description 创建卡密
   * @param options
   * @returns
   * @example
   * */
  async createCards(options: IBatchCreateCardOptions) {
    const res = new LzResponse();
    const { count, type, createBy, parValue } = options;
    /**
     * 在数据库中生成多张卡密，卡密的数量由count决定，卡密内容为32位随机字符串
     */
    const cards = [];
    const createTime = new Date().valueOf().toString().substring(0, 13);
    for (let i = 0; i < count; i++) {
      cards.push({
        type,
        createBy,
        parValue,
        id: md5(Math.random().toString(36)).toUpperCase(),
        createTime,
      });
    }
    res.data = await this.cardModel.create(cards);
    return res;
  }

  /**
   * @description 通过卡密id查询卡密信息
   * @param options
   * @returns
   * */
  async getCardInfo(options: { id: string }) {
    const { id } = options;
    const res = new LzResponse();
    const targetCard = await this.cardModel.findOne({ id });

    if (targetCard) {
      res.data = targetCard;
    } else {
      res.success = false;
      res.message = '卡密不存在';
    }
    return res;
  }

  /**
   * 使用卡密id，充值
   */
  async rechargeCard(options: { id: string; qNumber: string }) {
    const { id, qNumber } = options;
    const res = new LzResponse();
    let targetCard = await this.cardModel.findOne({ id, status: '0' });

    if (targetCard?.status === '0') {
      targetCard.useTime = new Date().valueOf().toString().substring(0, 13);
      targetCard.userId = qNumber;
      targetCard.status = '1';
      targetCard = await targetCard.save();
      res.data = targetCard;
    } else if (targetCard?.status === '1') {
      res.success = false;
      res.message = '卡密已被使用';
    } else if (targetCard?.status === '2') {
      res.success = false;
      res.message = '卡密已作废';
    } else {
      res.success = false;
      res.message = '卡密不存在或已被使用';
    }
    return res;
  }

  /**
   * 卡密作废
   */
  async invalidCard(options: { id: string }) {
    const { id } = options;
    const res = new LzResponse();
    const targetCard = await this.cardModel.findOneAndUpdate(
      { id, used: false, status: '0' },
      {
        status: '2',
      }
    );
    if (targetCard) {
      res.data = targetCard;
    } else {
      res.success = false;
      res.message = '卡密不存在或已被使用';
    }
    return res;
  }

  /**
   * 查询卡密列表
   */
  async getCardList(options: {
    page: number;
    pageSize: number;
    type?: string;
    status?: string;
    createBy?: string;
    userId?: string;
  }) {
    const res = new LzResponse();
    const { page, pageSize, ...rest } = options;
    const skip = (page - 1) * pageSize;
    const query = Object.assign({}, rest);

    const list = await this.cardModel
      .find(query)
      .skip(Number(skip))
      .limit(Number(pageSize));
    const total = await this.cardModel.countDocuments(query);
    if (list) {
      res.data = {
        list,
        total,
      };
    } else {
      res.success = false;
      res.message = '查询失败';
    }
    return res;
  }
}
