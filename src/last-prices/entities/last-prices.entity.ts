import { ApiProperty } from '@nestjs/swagger';

export class LastPrices {
  @ApiProperty({ example: 100, description: 'The id from postgresql' })
  id: number;

  @ApiProperty({
    example: '2024-02-19T11:27:57.110Z',
    description: 'The time when this exchange rate was',
  })
  createdAt: Date | string;

  @ApiProperty({
    example: '3.3459',
    description: 'Exchange rate was',
  })
  price: number;

  @ApiProperty({
    example: 'LDO-USDT',
    description: 'Cryptocurrency pair name',
  })
  symbol: string;
}
