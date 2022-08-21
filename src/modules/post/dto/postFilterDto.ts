import { IsString, IsNotEmpty, IsNumber, ValidateIf, IsBoolean } from 'class-validator';
import {  Expose } from 'class-transformer';

export class PostFilterDto {
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
  public title: string;

  @Expose()
  @IsBoolean()
  public isApproved: boolean;
}
