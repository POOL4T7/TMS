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
