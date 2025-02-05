export interface User {
  id: number | null;
  username: string | null;
  email: string | null;
  tasks: Task[] | null;
  comments: Comment[] | null;
  replies: CommentReply[] | null;
  projects: Project[] | null;
  createdProjects: Project[] | null;
}

export interface Task {
  id: number | null;
  userId: number;
  title: string;
  description: string;
  projectId?: number;
  isDone: boolean;
  createdAt: string;
  dueDate?: string;
  priority: string;
  updatedAt: string;
  user: User;
  project?: Project;
  comments: Comment[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  participants: User[];
  createdAt: string;
  isDone: boolean;
  deadline?: string;
  createdBy: User;
  createdById: number;
  updatedAt: string;
  tasks: Task[];
  isDeleted: boolean;
}

export interface Comment {
  id: number;
  userId: number;
  taskId: number;
  createdAt: string;
  likes: number;
  content: string;
  user: User;
  task: Task;
  replies: CommentReply[];
}

export interface CommentReply {
  id: number;
  userId: number;
  commentId: number;
  createdAt: string;
  content: string;
  likes: number;
  user: User;
  comment: Comment;
}
