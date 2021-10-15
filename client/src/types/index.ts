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

export interface Post {
  id: number;
  createdBy: string;
  classId: number;
  postType: 'question' | 'note';
  title: string;
  content: string;
  date: string;
}

export interface Answer {
  userID: string;
  classID: string;
  type: string;
  isAnonymous: boolean;
  upvotes: string;
  content: string;
}
