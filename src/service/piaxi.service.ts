// 参考 ./service/user.service.ts文件，实现piaxiService服务

import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { GetPiaxiInfoOptions } from '../interface/piaxi';
import { Piaxi } from '../entity/piaxi';
import { LzResponse } from '../utils';

@Provide()
/**
 * Service class for managing Piaxi accounts.
 */
export class PiaxiService {
  @InjectEntityModel(Piaxi)
  piaxiModel: ReturnModelType<typeof Piaxi>;

  /**
   * Creates a new Piaxi account.
   * @param data - The data for the new Piaxi account.
   * @returns An object containing the success status, message, and created Piaxi account.
   */
  async createPiaxi(data: Piaxi) {
    const res = new LzResponse<Piaxi>();
    console.log('data', data, this.piaxiModel);
    const targetPiaxi = await this.piaxiModel.create(data);
    if (targetPiaxi?.id === data.id) {
      res.data = targetPiaxi;
      res.success = true;
      res.message = 'piaxi账号创建成功';
    } else {
      res.success = false;
      res.message = 'piaxi账号创建失败';
    }

    return res;
  }

  /**
   * Retrieves information about a Piaxi account.
   * @param options - The options for retrieving the Piaxi account.
   * @param options.id - The ID of the Piaxi account to retrieve.
   * @param options.clientName - The client name of the Piaxi account to retrieve.
   * @param options.clientType - The client type of the Piaxi account to retrieve.
   * @returns A response object containing the success status, message, and Piaxi account information.
   */
  async getPiaxiInfo(options: GetPiaxiInfoOptions) {
    const res = new LzResponse();
    const { id, clientName, clientType } = options;
    const targetPiaxi = await this.piaxiModel.findOne({
      id,
      clientName,
      clientType,
    });
    if (targetPiaxi) {
      res.data = targetPiaxi;
    } else {
      res.success = false;
      res.message = 'piaxi账号不存在';
    }
    return res;
  }

  /**
   * Updates information of a Piaxi account.
   * @param data - The updated data for the Piaxi account.
   * @returns A response object containing the success status, message, and updated Piaxi account.
   */
  async updatePiaxiInfo(data: Piaxi) {
    const res = new LzResponse();
    const targetPiaxi = await this.piaxiModel.findOne({ id: data.id });
    if (targetPiaxi) {
      targetPiaxi.clientName = data.clientName;
      targetPiaxi.clientType = data.clientType;
      targetPiaxi.updateTime = new Date().valueOf().toString();
      res.data = await targetPiaxi.save();
    } else {
      res.success = false;
      res.message = 'piaxi账号不存在';
    }
    return res;
  }
}
