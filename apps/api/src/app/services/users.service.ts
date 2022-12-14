import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    
  async create(user: User): Promise<User> {
      const newUser = new this.userModel(user);
      return newUser.save();
  }

  async readAll(params): Promise<User[]> {
      return await this.userModel
      .find(params.search)
      .sort({id: -1})
      .skip(params.skip)
      .limit(params.limit)
      .exec();
  }

  async readById(id): Promise<User> {
      return await this.userModel.findById(id).exec();
  }

  async update(id, user: User): Promise<User> {
      return await this.userModel.findByIdAndUpdate(id, user, {new: true})
  }

  async delete(id): Promise<any> {
      return await this.userModel.findByIdAndRemove(id);
  }
}
