export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  status: string;
}

export interface Class {
  id: number;
  createdBy: string;
  className: string;
  classNumber: string;
  classTerm: string;
  status: boolean;
  privatePosts: boolean;
  studentPolls: boolean;
  description: string;
}
