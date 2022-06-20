import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../interfaces/user.entity';
import { JWTToken } from './../interfaces/user.interface';
import { UserInterface } from './../interfaces/user.interface';

const HTTP_ACCESS_FORBIDDEN = 403;

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async use(req: Request, res: Response, next: () => void) {
    const bearHeader = req.headers.authorization;

    if (
      typeof bearHeader !== 'undefined' &&
      process.env.JWT_SECRET !== undefined
    ) {
      const bearer = bearHeader.split(':');
      const bearerToken = bearer[1];

      if (jwt.verify(bearerToken, process.env.JWT_SECRET) !== undefined) {
        this.setUserID(req, bearerToken, next);
      } else {
        res.sendStatus(HTTP_ACCESS_FORBIDDEN);
      }
    } else {
      res.sendStatus(HTTP_ACCESS_FORBIDDEN);
    }
  }

  private async setUserID(req: Request, bearerToken: string, next: () => void) {
    const token: JWTToken = jwt.verify(
      bearerToken,
      process.env.JWT_SECRET,
    ) as JWTToken;

    const isUserReg = await this.findOne(token.id);

    if (
      isUserReg !== undefined &&
      isUserReg.id !== undefined &&
      isUserReg.id > 0
    ) {
      req.body.user_id = isUserReg.id;
      next();
    }
  }

  private async findOne(id: number): Promise<UserInterface | undefined> {
    return this.userRepository.findOne({ id, isActive: true });
  }
}
