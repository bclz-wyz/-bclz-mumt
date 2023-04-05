/**
 * 参照目录下api.controller.ts文件，编写card.controller文件
 * 1.批量创建卡密
 * 2.查询卡密信息
 * 3.卡密充值(使用)
 */
import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Inject,
  Context,
} from '@midwayjs/core';
import { CardService } from '../service/card.service';
import { IBatchCreateCardOptions } from '../interface';

@Controller('/api/cards')
export class CardController {
  @Inject()
  ctx: Context;

  @Inject()
  cardService: CardService;

  /**
   * 批量创建卡密
   * 根据以下注释，实现批量创建卡密的接口
   * 1. 卡密数量
   * 2. 卡密面值
   * 3. 卡密类型
   * 4. 创建人
   * @param data
   * @returns
   * */
  @Post('/create_cards')
  async batchCreate(@Body() data: IBatchCreateCardOptions) {
    const res = await this.cardService.createCards(data);
    return {
      success: res.success || true,
      message: res.message || 'OK',
      data: res.data,
    };
  }

  /**
   * 查询卡密信息
   * @param data
   * @returns
   *
   *
   * */
  @Get('/get_card_info')
  async getCardInfo(@Query('id') id: string) {
    const res = await this.cardService.getCardInfo({ id });
    return {
      success: res.success || true,
      message: res.message || 'OK',
      data: res.data,
    };
  }

  /**
   * 卡密充值(使用)
   * @param data
   * @returns
   *
   * */
  @Post('/recharge_card')
  async rechargeCard(@Body() data: { id: string; qNumber: string }) {
    const res = await this.cardService.rechargeCard(data);
    return {
      success: res.success || true,
      message: res.message || 'OK',
      data: res.data,
    };
  }

  /**
   * 参照service/card.service.ts文件，实现以下接口
   * 批量查询卡密
   */
  @Get('/get_card_list')
  async getCardList(@Query() data) {
    const res = await this.cardService.getCardList({ ...data });
    return {
      success: res.success || true,
      message: res.message || 'OK',
      data: res.data,
    };
  }
}
