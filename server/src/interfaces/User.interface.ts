interface IUser {
  username: string;
  email: string;
  password: string;
  role: "manager" | "admin" | "employee";
  firstName: string;
  lastName?: string;
  profilePicture: string;
  employeeId?: string;
  department?: string;
  position?: string;
  hireDate?: Date;
  qualification: string[];
}

export default IUser;
