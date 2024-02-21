interface Team {
  name: string;
  _id: string;
}

export interface PositionList {
  _id: string;
  name: string;
  team: Team;
  totalMembers: number;
  slug: string;
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

export interface PositionAddData{
  name: string;
  teamId: string;
  status: string;
  slug: string;
}

export interface PositionPostData extends PositionAddData {
  companyId: string;
}

export interface ReturnObject{
  success:boolean;
  message:string
}

export interface PositionPostResponse extends ReturnObject {
  position: PositionObject;
}


export interface PositionObject {
  name: string;
  teamId: string;
  companyId: string;
  status: "active" | "inactive" | "deleted";
  slug: string;
  createdBy: string;
}

export interface PositionDetails{
  name: string;
  teamId: Team;
  // companyId: string;
  status: "active" | "inactive" | "deleted";
  slug: string;
  createdBy: string;
}

export interface PositionDetailsResponse extends ReturnObject{
  position:PositionDetails
}