import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCvDto {

  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @Type(() => Number )
  @IsNumber()
  @Min(15)
  @Max(65)
  age: number;

  @IsOptional()
  @Type(() => Number )
  @IsNumber()
  cin: number;

  @IsOptional()
  @IsString()
  job: string;

  @IsOptional()
  @IsString()
  path: string;
}
