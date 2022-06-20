import { Controller, Get, Query } from '@nestjs/common';
import { DefaultService } from './default.service';

@Controller('default')
export class DefaultController {
  constructor(private defaultService: DefaultService) {}

  @Get()
  public async getData(@Query() params?) {
    const id = params.id ? params.id : 1;
    return await this.defaultService.findById(id);
  }
}
