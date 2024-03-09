export interface Team_Post {
  name: string;
  slug: string;
  //   companyId:string;
  status: "active" | "inactive" | "deleted";
  image?: string;
}

export interface TeamList {
  _id: string;
  name: string;
  totalMembers: number;
  status: "active" | "inactive" | "deleted";
  manager?: string;
  image: string;
}

export interface TeamAddData {
  name: string;
  status: string;
  slug: string;
  image: string;
}

export interface TeamUpdateData {
  _id: string;
  name: string;
  status: string;
  slug: string;
  image: string;
}

export interface ReturnObject {
  success: boolean;
  message: string;
}
