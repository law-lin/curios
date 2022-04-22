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
  role: string;
}

export interface Post {
  id: number;
  createdAt: string;
  createdBy: string;
  classId: number;
  postType: 'question' | 'note';
  isArchived: boolean;
  title: string;
  content: string;
  date: string;
}

export interface Answer {
  id: number;
  createdAt: string;
  createdBy: string;
  postId: number;
  type: string;
  isAnonymous?: boolean;
  upvotes: string;
  content: string;
}
