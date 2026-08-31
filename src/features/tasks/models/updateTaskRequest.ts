import type { TaskPriority } from "../constants/taskPriority";
import type { TaskStatus } from "../constants/taskStatus";

export interface UpdateTaskRequest {
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assignToPublicId: string;
}