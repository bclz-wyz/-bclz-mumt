import { Provide } from '@midwayjs/core';
import { IUserOptions } from '../interface';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../entity/user';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
  async createUser(options: User) {
    return await this.userModel.create(options);
  }
}

@Provide()
export class TestService {
  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  async getTest() {
    // create data
    // const { _id: id } = await this.userModel.create({
    //   name: 'JohnDoe',
    //   jobs: ['Cleaner'],
    // } as User); // an "as" assertion, to have types for all properties

    // find data
    const user = await this.userModel.findById('').exec();
    console.log(user);
    return user;
  }
}
