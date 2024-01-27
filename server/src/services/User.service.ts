import User, { IUser } from "../models/User.model";

class UserService {
  async createUser(data: IUser): Promise<IUser> {
    try {
      const user = await User.create(data);
      return user;
    } catch (error: any) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async getUserById(userId: string): Promise<IUser | null> {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error: any) {
      throw new Error(`Error getting user: ${error.message}`);
    }
  }

  async updateUser(
    userId: string,
    data: Partial<IUser>
  ): Promise<IUser | null> {
    try {
      const user = await User.findByIdAndUpdate(userId, data, { new: true });
      return user;
    } catch (error: any) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      await User.findByIdAndDelete(userId);
    } catch (error: any) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }

  async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await User.find();
      return users;
    } catch (error: any) {
      throw new Error(`Error getting users: ${error.message}`);
    }
  }
}

export default UserService;
