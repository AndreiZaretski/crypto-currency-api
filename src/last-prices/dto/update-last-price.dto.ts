import { PartialType } from '@nestjs/mapped-types';
import { CreateLastPriceDto } from './create-last-price.dto';

export class UpdateLastPriceDto extends PartialType(CreateLastPriceDto) {}
