import { Piaxi } from '../entity/piaxi';

/**
 * getPiaxiInfo的参数, 包含id,clientName,clientType
 */
export interface GetPiaxiInfoOptions {
  id?: Piaxi['id'];
  clientName?: Piaxi['clientName'];
  clientType?: Piaxi['clientType'];
}
