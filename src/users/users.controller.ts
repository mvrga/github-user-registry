import { Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { GithubUser } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(':username')
  async create(@Param('username') username: string): Promise<GithubUser> {
    return this.usersService.fetchAndSaveUser(username);
  }

  @Get()
  async getAllUsers(): Promise<GithubUser[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<GithubUser | null> {
    return this.usersService.getUserById(id);
  }

  @Get('username/:login')
  async findByUsername(@Param('login') login: string): Promise<GithubUser | null> {
    return this.usersService.findByUsername(login);
  }
}