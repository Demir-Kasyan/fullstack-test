import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { UsersService } from '../services/users.service';
import { User } from '../schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService){}

  @Post()
  async createBook(@Res() response, @Body() user: User) {
      const newUser = await this.usersService.create(user);
      return response.status(HttpStatus.CREATED).json({
          newUser
      })
  }

  @Get()
  async fetchAll(@Param() params, @Res() response) {
    console.log(params);
      const users = await this.usersService.readAll(params);
      return response.status(HttpStatus.OK).json({
          users
      })
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
      const user = await this.usersService.readById(id);
      return response.status(HttpStatus.OK).json({
          user
      })
  }

  @Put('/:id')
  async update(@Res() response, @Param('id') id, @Body() user: User) {
      const updatedUser = await this.usersService.update(id, user);
      return response.status(HttpStatus.OK).json({
          updatedUser
      })
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
      const deletedUser = await this.usersService.delete(id);
      return response.status(HttpStatus.OK).json({
          deletedUser
      })
  }
}
