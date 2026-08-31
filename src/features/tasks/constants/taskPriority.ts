export const TaskPriorities = [
    "Urgent",
    "High",
    "Medium",
    "Low",
] as const;

export type TaskPriority =
    (typeof TaskPriorities)[number];