import { ApiProperty } from '@nestjs/swagger';

export class History {
  @ApiProperty({ example: 100, description: 'The id from postgresql' })
  historyId: number;

  @ApiProperty({
    example: '2024-02-19T11:27:57.110Z',
    description: 'The time when this exchange rate was',
  })
  time: Date | string;

  @ApiProperty({
    example: '3.3459',
    description: 'Exchange rate was',
  })
  price: number;

  @ApiProperty({
    example: 'LDO-USDT',
    description: 'Cryptocurrency pair name',
  })
  tickerSymbol: string;
}
