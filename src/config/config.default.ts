import { MidwayConfig } from '@midwayjs/core';
import { User } from '../entity/user';
import { Card } from '../entity/card';
import { Piaxi } from '../entity/piaxi';
import { Task } from '../entity/tasks';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1679576034353_4918',
  koa: {
    port: 7001,
  },
  mongoose: {
    dataSource: {
      default: {
        // uri: 'mongodb://192.168.10.203:27017/test',
        uri: 'mongodb://81.70.17.158:28017/lrs',
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          user: 'bclz',
          pass: 'Azx761055137.',
        },
        // 关联实体
        entities: [User, Card, Piaxi, Task],
      },
    },
  },
} as MidwayConfig;
