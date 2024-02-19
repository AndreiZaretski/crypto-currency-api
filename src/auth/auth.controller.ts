import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import {
  ApiBody,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Signup', description: 'Signup a user' })
  @ApiBody({
    description: 'Register new user',
    type: CreateAuthDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created and login',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request body does not contain required fields',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User with login Login already exists in users',
  })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signup(createAuthDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login', description: 'Login user' })
  @ApiBody({
    description: 'Login user',
    type: CreateAuthDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully login',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request body does not contain required fields',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Login or password is wrong',
  })
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @Get()
  @ApiExcludeEndpoint()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  @ApiExcludeEndpoint()
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
