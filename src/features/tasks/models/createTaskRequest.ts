import type { TaskPriority } from "../constants/taskPriority";
import type { TaskStatus } from "../constants/taskStatus";

export interface CreateTaskRequest {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assignedToPublicId: string;
}