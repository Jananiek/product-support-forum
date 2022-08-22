import { IsString, IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';
import {  Expose } from 'class-transformer';

export class UserFilterDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  public page: number;

  @Expose()
  @IsNotEmpty()
  @ValidateIf(o => o.pageSize > 0)
  @IsNumber()
  public pageSize: number;

  @Expose()
  @IsString()
  public userName: string;

  @Expose()
  @IsString()
  public email: string;
}
