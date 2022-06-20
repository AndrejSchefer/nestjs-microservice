import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Default } from './default.entity';

@Injectable()
export class DefaultService {
  constructor(
    @InjectRepository(Default)
    private readonly bankRepository: Repository<Default>,
  ) {}

  public async findById(id: string): Promise<any> {
    return { data: 'Find data with id:' + id };
  }
}
