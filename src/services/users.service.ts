import { fileReader, fileWriter } from '../helpers/DataSource.helper';
import { IUser } from '../models/user.interface';

export class UserService {
  createUser(user: IUser): IUser {
    const newUser: IUser = {
      ...user,
    };
    const users: IUser[] = fileReader('./src/mocks/users.json');
    users.push(newUser);
    fileWriter('./src/data/users.json', users);
    return newUser;
  }

  getAllUsers(): IUser[] {
    return fileReader('./src/mocks/users.json');
  }

  getUserById(id: number): IUser | undefined {
    const users: IUser[] = fileReader('./src/mocks/users.json');
    return users.find((user) => user.id === id);
  }

  deleteUserById(id: number): IUser {
    const users: IUser[] = fileReader('./src/mocks/users.json');
    const user = users.filter((user, i) => user.id === id);
    const updatedUsers = users.filter((user, i) => user.id !== id);
    fileWriter('./src/data/users.json', updatedUsers);
    return user[0];
  }
}
