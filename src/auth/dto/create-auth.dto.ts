import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    description: 'Unique name user',
    example: 'Unique name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'very strong password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
