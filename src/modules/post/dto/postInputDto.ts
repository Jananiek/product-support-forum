import { IsString, IsBoolean } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { Comment } from '../../../typeorm/entities/Comment';
import { User } from '../../../typeorm/entities/User';

export class PostInputDto {
  @Expose()
  @IsString()
  public id?: number;

  @Expose()
  @IsString()
  public title: string;

  @Expose()
  @Type(()=>User)
  public user?: User;

  @Expose()
  @IsBoolean()
  public isApproved?: boolean;

  @Expose()
  @IsString()
  public content: string;

  @Expose()
  @Type(() => Comment)
  public comments?: Comment[];
}
