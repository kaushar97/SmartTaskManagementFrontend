import type { TaskStatus } from "../constants/taskStatus";
import type { TaskPriority } from "../constants/taskPriority";

export interface Task {
  publicId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdDate: string;
  dueDate: string;
  assignedToPublicId: string;
  assignedToName: string;
  createdByPublicId: string;
  createdByName: string;
}