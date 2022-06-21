import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../interfaces/user.entity';
@Injectable()
export class DefaultService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async findById(id: string, user_id?: number): Promise<any> {
    const user = await this.userRepository.findOne({
      id: user_id,
      isActive: true,
    });

    return {
      data: 'Find data with id ' + id + ' and with user_id ' + user_id,
      user,
    };
  }
}
