import DepartmentModel, { IDepartment } from "../models/Department.model";

class DepartmentService {
  async createDepartment(data: IDepartment): Promise<IDepartment> {
    try {
      const department = await DepartmentModel.create(data);
      return department;
    } catch (error: any) {
      throw new Error(`Error creating department: ${error.message}`);
    }
  }

  async getDepartmentById(departmentId: string): Promise<IDepartment | null> {
    try {
      const department = await DepartmentModel.findById(departmentId);
      return department;
    } catch (error: any) {
      throw new Error(`Error getting department: ${error.message}`);
    }
  }

  async updateDepartment(
    departmentId: string,
    data: Partial<IDepartment>
  ): Promise<IDepartment | null> {
    try {
      const department = await DepartmentModel.findByIdAndUpdate(
        departmentId,
        data,
        { new: true }
      );
      return department;
    } catch (error: any) {
      throw new Error(`Error updating department: ${error.message}`);
    }
  }

  async deleteDepartment(departmentId: string): Promise<void> {
    try {
      await DepartmentModel.findByIdAndDelete(departmentId);
    } catch (error: any) {
      throw new Error(`Error deleting department: ${error.message}`);
    }
  }

  async getAllDepartments(): Promise<IDepartment[]> {
    try {
      const departments = await DepartmentModel.find();
      return departments;
    } catch (error: any) {
      throw new Error(`Error getting departments: ${error.message}`);
    }
  }
}

export default DepartmentService;
