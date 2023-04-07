import { MidwayConfig } from '@midwayjs/core';
import { User } from '../entity/user';
import { Card } from '../entity/card';

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
        uri: 'mongodb://192.168.100.3:27017/test',
        options: {
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          user: '',
          pass: '',
        },
        // 关联实体
        entities: [User, Card],
      },
    },
  },
} as MidwayConfig;
