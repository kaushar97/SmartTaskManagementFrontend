export const TaskStatuses = [
    "Open",
    "InProgress",
    "OnHold",
    "Completed",
] as const;

export type TaskStatus =
    (typeof TaskStatuses)[number];