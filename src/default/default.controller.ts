import { Controller, Get, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { DefaultService } from './default.service';

@Controller('default')
export class DefaultController {
  constructor(private defaultService: DefaultService) {}

  @Get()
  public async getData(@Query() params?) {
    const id = params.id ? params.id : 1;
    console.log(id);
    return await this.defaultService.findById(id);
  }

  @Get('with-authentication')
  public async getDataWithAuthentication(
    @Req() req?: Request,
    @Query() params?,
  ) {
    const id = params.id ? params.id : 1;
    const { user_id } = req.body;

    return await this.defaultService.findById(id, user_id);
  }
}
