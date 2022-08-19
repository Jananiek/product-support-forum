import { IsString, IsDefined, IsNotEmpty, IsNumber } from 'class-validator';
import {  Expose } from 'class-transformer';

export class RegisterDto {
  @Expose()
  @IsNumber()
  public id: number;

  @Expose()
  @IsString()
  public userName!: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  public password: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  public email: string;

  @Expose()
  @IsString()
  public firstName?: string;

  @Expose()
  @IsString()
  public lastName?: string;
}
