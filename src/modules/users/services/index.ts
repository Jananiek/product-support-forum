import { IPagination } from '../../../interfaces/IPagination';
import { IResponseListResult } from '../../../interfaces/IResponseListResult';
import { User } from '../../../typeorm/entities/User';
import { removeNullOrUndefinedValues } from '../../../utils/helpers';
import { UserFilterDto } from '../dto/userFilterDto';
import { UserRepository } from '../repositories';
const jwt = require('jsonwebtoken');
require('dotenv').config();
//import dotenv from 'dotenv';
//dotenv.config()

export class UserService {
  protected userRepo: UserRepository;
  constructor() {
    this.userRepo = new UserRepository();
  }

  public getUSerFilterOptions(data: Record<string, any>): UserFilterDto {
    const filterOptions: UserFilterDto = {
      page: data.page ? Number(data.page) : 1,
      pageSize: data.pageSize ? Number(data.pageSize) : 10,
      userName: data.userName ? String(data.userName) : undefined,
      email: data.email ? data.email : undefined,
    };
    return filterOptions;
  }
  public async getAll(query: Record<string, unknown>): Promise<IResponseListResult<User>> {
    try {
      const filterOptions = this.getUSerFilterOptions(query);
      const filteredOptions = removeNullOrUndefinedValues(filterOptions);
      const { page, pageSize, list, total } = await this.userRepo.getUsersWithPagination(filteredOptions);
      const paginationInfo: IPagination = {
        pages: Math.ceil(total / pageSize),
        pageSize,
        items: total,
        currentPage: page,
      };
      return {
        items: list,
        pagination: paginationInfo,
      };
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
