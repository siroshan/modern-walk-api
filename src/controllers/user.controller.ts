import { Get, Route, Post, Path, Body, Delete } from 'tsoa';
import { IApiResponse } from '../common/response.interface';
import { UserService } from '../services/users.service';
import { IUser } from '../models/user.interface';
import { v4 as uuidv4 } from 'uuid';

@Route('/api/v1/users')
export default class UserController {
  userService;

  constructor() {
    this.userService = new UserService();
  }

  @Post('/')
  public createUser(@Body() user: Omit<IUser, 'id'>): IApiResponse<IUser> {
    const isUserExists = this.userService.checkUserExists(user.email);
    if (!isUserExists) {
      const newUser = this.userService.createUser({ ...user, id: uuidv4() });
      const response = {
        data: newUser,
        status: 200,
        message: 'Request Successful',
      };
      return response;
    }

    return { status: 400, message: 'User already exist' };
  }

  @Get('/')
  public getAllUsers(): IApiResponse<IUser[]> {
    const users = this.userService.getAllUsers();

    if (users.length === 0) {
      return { status: 404, message: 'No users found' };
    }

    return {
      data: users,
      status: 200,
      message: 'Request Successful',
    };
  }

  @Get('{id}')
  public getUserById(@Path() id: string): IApiResponse<IUser> {
    const user = this.userService.getUserById(id);
    let response: IApiResponse<IUser>;
    if (user) {
      response = {
        data: user,
        status: 200,
        message: 'Request Successfull',
      };
    } else {
      response = {
        status: 404,
        message: 'Not found',
      };
    }

    return response;
  }

  @Delete('{id}')
  public deleteUserById(@Path() id: string): IApiResponse<IUser> {
    const user = this.userService.getUserById(id);
    let response: IApiResponse<IUser>;
    if (user) {
      this.userService.deleteUserById(id);
      response = {
        data: user,
        status: 200,
        message: 'Request Successfull',
      };
    } else {
      response = {
        status: 404,
        message: 'Not found',
      };
    }

    return response;
  }
}
