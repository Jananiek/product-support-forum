import { IsString, IsNotEmpty } from 'class-validator';
import {  Expose } from 'class-transformer';

export class UserLoginDto {

  @Expose()
  @IsNotEmpty()
  @IsString()
  public email: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  public password: string;
}
