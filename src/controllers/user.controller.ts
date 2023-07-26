import { IApiResponse } from '../common/Response.interface';
import { UserService } from '../services/users.service';
import { IUser } from '../models/user.interface';

export default class UserController {
  userService;

  constructor() {
    this.userService = new UserService();
  }

  public createUser(user: IUser): IApiResponse<IUser> {
    const users = this.userService.createUser(user);
    const response = {
      data: users,
      status: 200,
      message: 'Request Successful',
    };
    return response;
  }

  public getAllUsers(): IApiResponse<IUser[]> {
    const users = this.userService.getAllUsers();
    const response = {
      data: users,
      status: 200,
      message: 'Request Successful',
    };
    return response;
  }

  public getUserById(id: number): IApiResponse<IUser> {
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

  public deleteUserById(id: number): IApiResponse<IUser> {
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
