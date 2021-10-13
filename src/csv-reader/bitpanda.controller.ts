import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { BitpandaService } from './bitpanda.service';

@Controller('bitpanda')
export class BitpandaController {

    constructor(private bitpandaService: BitpandaService) { }

    @Get()
    public async getCSV(@Req() request: Request) {
        return await this.bitpandaService.readCSV()
    }
}
