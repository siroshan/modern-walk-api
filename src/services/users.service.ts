import { fileReader, fileWriter } from '../helpers/DataSource.helper';
import { IUser } from '../models/user.interface';

export class UserService {
  createUser(user: IUser): IUser {
    try {
      const newUser: IUser = {
        ...user,
      };
      const users: IUser[] = fileReader('./src/mocks/users.json');
      users.push(newUser);
      fileWriter('./src/mocks/users.json', users);
      return newUser;
    } catch (err) {
      throw err;
    }
  }

  getAllUsers(): IUser[] {
    return fileReader('./src/mocks/users.json');
  }

  getUserById(id: string): IUser | undefined {
    const users: IUser[] = fileReader('./src/mocks/users.json');
    return users.find((user) => user.id === id);
  }

  deleteUserById(id: string): IUser {
    const users: IUser[] = fileReader('./src/mocks/users.json');
    const user = users.filter((user, i) => user.id === id);
    const updatedUsers = users.filter((user, i) => user.id !== id);
    fileWriter('./src/mocks/users.json', updatedUsers);
    return user[0];
  }

  checkUserExists(email: string): boolean {
    const users: IUser[] = fileReader('./src/mocks/users.json');
    return users.find((user) => user.email === email) ? true : false;
  }
}
