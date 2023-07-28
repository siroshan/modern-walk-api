import { IApiResponse } from '../common/Response.interface';
import { UserService } from '../services/users.service';
import { IUser } from '../models/user.interface';
import { v4 as uuidv4 } from 'uuid';

export default class UserController {
  userService;

  constructor() {
    this.userService = new UserService();
  }

  public createUser(user: Omit<IUser, 'id'>): IApiResponse<IUser> {
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

  public getUserById(id: string): IApiResponse<IUser> {
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

  public deleteUserById(id: string): IApiResponse<IUser> {
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
