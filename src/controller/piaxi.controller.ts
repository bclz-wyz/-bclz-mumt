// 参考：./src/controller/api.controller.ts文件，补全PiaxiController类

import {
  Body,
  Context,
  Controller,
  Get,
  Inject,
  Post,
  Query,
} from '@midwayjs/core';
import { PiaxiService } from '../service/piaxi.service';
import { Piaxi } from '../entity/piaxi';

@Controller('/api/piaxis')
export class PiaxiController {
  @Inject()
  ctx: Context;

  @Inject()
  piaxiService: PiaxiService;

  /**
   * 添加piaxi账号
   * @param data
   * @returns
   */
  @Post('/create_piaxi')
  async addPiaxi(@Body() data: Piaxi) {
    /**
     * step1: 判断用户是否存在
     */
    const { id, clientName, clientType } = data;

    const checkPiaxi = await this.piaxiService.getPiaxiInfo({
      id,
      clientName,
      clientType,
    });

    if (checkPiaxi.success) {
      return {
        success: false,
        message: 'piaxi账号已存在',
      };
    } else {
      const res = await this.piaxiService.createPiaxi(data);
      return {
        success: res.success || false,
        message: res.message || 'OK',
        data: res.data,
      };
    }
  }

  /**
   * 获取piaxi账号信息
   */
  @Get('/get_piaxi_info')
  async getPiaxiInfo(
    @Query('id') id,
    @Query('clientName') clientName,
    @Query('clientType') clientType
  ) {
    const res = await this.piaxiService.getPiaxiInfo({
      id,
      clientName,
      clientType,
    });
    return {
      success: res.success || false,
      message: res.message || 'OK',
      data: res.data,
    };
  }

  /**
   * 更新piaxi账号信息
   */
  @Post('/update_piaxi_info')
  async updatePiaxiInfo(@Body() data: Piaxi) {
    const res = await this.piaxiService.updatePiaxiInfo(data);
    return {
      success: res.success || false,
      message: res.message || 'OK',
      data: res.data,
    };
  }
}
