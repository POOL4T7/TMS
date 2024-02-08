export interface Position_Post {
  name: string;
  slug: string;
  companyId: string;
  status: "active" | "inactive" | "deleted";
}

interface Team {
  name: string;
  _id: string;
}

export interface PositionList {
  _id: string;
  name: string;
  team: Team;
  totalMembers: number;
  status: "active" | "inactive" | "deleted";
}

export interface PositionGetApiData {
  positionList: PositionList[];
  totalPosition: number;
}

export interface PositionGetApiResponse extends PositionGetApiData {
  success: boolean;
  message: string;
}
