import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma-db/prisma-db.service';
import { BcryptService } from './bcrypt.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private bcrypt: BcryptService,
    private jwtService: JwtService,
  ) {}

  async signup(createAuth: CreateAuthDto) {
    try {
      const hashedPassword = await this.bcrypt.hashPassword(
        createAuth.password,
      );
      const user = await this.prisma.user.create({
        data: {
          name: createAuth.name,
          password: hashedPassword,
        },
      });

      return await this.jwtService.signAsync({
        sub: user.userId,
        username: user.name,
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        throw new ConflictException(
          `User with login ${createAuth.name} already exists in users`,
        );
      } else {
        throw err;
      }
    }
  }

  async login(createAuth: CreateAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { name: createAuth.name },
    });
    if (!user) {
      throw new ForbiddenException(
        `User with id ${createAuth.name} doesn't exist`,
      );
    }

    if (user) {
      const isMatch = await this.bcrypt.comparePassword(
        createAuth.password,
        user.password,
      );
      if (!isMatch) {
        throw new ForbiddenException('Password is wrong');
      }
    }

    return await this.jwtService.signAsync({
      sub: user.userId,
      username: user.name,
    });
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
