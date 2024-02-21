interface User {
  username?: string;
  email: string;
  role: "manager" | "admin" | "employee";
  firstName: string;
  lastName?: string;
  profilePicture?: string;
  employeeId?: string;
  department?: Department;
  position?: Position;
  hireDate?: Date;
  qualification?: string[];
}

interface Department {
  _id: string;
  name: string;
}

interface Position {
  _id: string;
  name: string;
}

export interface UserPaginationData {
  userList: User[];
  totalCount: number;
}
