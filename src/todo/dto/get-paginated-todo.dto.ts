import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetPaginatedTodoDto {

  @IsNumber()
  @IsOptional()
  @Type(()=> Number)
  page: number;

  @IsNumber()
  @IsOptional()
  @Type(()=> Number)
  item: number;
}
