export interface Team_Post {
  name: string;
  slug: string;
  //   companyId:string;
  status: "active" | "inactive" | "deleted";
  image?: string;
}

export interface TeamList {
  name: string;
  totalMembers: number;
  status: "active" | "inactive" | "deleted";
  manager?: string;
}
