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

 
}
