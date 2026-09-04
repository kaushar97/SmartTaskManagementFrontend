import { Link } from "react-router-dom";
import { useTasks } from "../../tasks/hooks/useTasks";

const DashboardPage = () => {
const {
tasks,
isLoading,
error,
} = useTasks();

const totalTasks = tasks.length;

const openTasks = tasks.filter(
    (task) => task.status === "Open"
).length;

const inProgressTasks = tasks.filter(
    (task) => task.status === "InProgress"
).length;

const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
).length;

const overdueTasks = tasks.filter((task) => {
    if (task.status === "Completed") {
        return false;
    }

    return new Date(task.dueDate).getTime() < Date.now();
}).length;

const recentTasks = [...tasks]
    .sort(
        (a, b) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
    )
    .slice(0, 5);

const summaryCards = [
    {
        title: "Total Tasks",
        value: totalTasks,
        description: "All available tasks",
        icon: "📋",
    },
    {
        title: "Open",
        value: openTasks,
        description: "Tasks waiting to start",
        icon: "○",
    },
    {
        title: "In Progress",
        value: inProgressTasks,
        description: "Currently being worked on",
        icon: "◐",
    },
    {
        title: "Completed",
        value: completedTasks,
        description: "Successfully completed",
        icon: "✓",
    },
    {
        title: "Overdue",
        value: overdueTasks,
        description: "Past their due date",
        icon: "!",
    },
];

return (
    <div className="space-y-8">

        {/* Header */}

        <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-600">
                Get an overview of your tasks and current progress.
            </p>
        </div>

        {/* Loading State */}

        {isLoading && (
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">

                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />

                    <p className="text-sm font-medium text-slate-600">
                        Loading dashboard...
                    </p>

                </div>
            </div>
        )}

        {/* Error State */}

        {!isLoading && error && (
            <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-5"
            >
                <h2 className="font-semibold text-red-800">
                    Unable to load dashboard
                </h2>

                <p className="mt-1 text-sm text-red-700">
                    {error}
                </p>
            </div>
        )}

        {/* Dashboard Content */}

        {!isLoading && !error && (
            <>
                {/* Summary Cards */}

                <section aria-label="Task summary">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

                        {summaryCards.map((card) => (
                            <div
                                key={card.title}
                                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <div className="flex items-start justify-between">

                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            {card.title}
                                        </p>

                                        <p className="mt-2 text-3xl font-bold text-slate-900">
                                            {card.value}
                                        </p>
                                    </div>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-lg font-semibold text-slate-700">
                                        {card.icon}
                                    </div>

                                </div>

                                <p className="mt-3 text-xs text-slate-500">
                                    {card.description}
                                </p>
                            </div>
                        ))}

                    </div>
                </section>

                {/* Main Dashboard Content */}

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                    {/* Recent Tasks */}

                    <section className="xl:col-span-2">

                        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

                            <div className="flex flex-col gap-3 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">

                                <div>
                                    <h2 className="text-xl font-semibold text-slate-900">
                                        Recent Tasks
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        The latest tasks created in the system.
                                    </p>
                                </div>

                                <Link
                                    to="/tasks"
                                    className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                >
                                    View All Tasks
                                </Link>

                            </div>

                            <div className="p-6">

                                {recentTasks.length === 0 ? (
                                    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                                        <p className="text-sm font-medium text-slate-700">
                                            No tasks available.
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Tasks will appear here once they are created.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">

                                        {recentTasks.map((task) => {

                                            const isOverdue =
                                                task.status !== "Completed" &&
                                                new Date(task.dueDate).getTime() < Date.now();

                                            return (
                                                <div
                                                    key={task.publicId}
                                                    className="rounded-xl border border-slate-200 p-5 transition hover:border-slate-300 hover:shadow-sm"
                                                >

                                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                                                        <div className="min-w-0">

                                                            <h3 className="truncate font-semibold text-slate-900">
                                                                {task.title}
                                                            </h3>

                                                            <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                                                                {task.description ||
                                                                    "No description provided."}
                                                            </p>

                                                        </div>

                                                        <Link
                                                            to={`/tasks/${task.publicId}/edit`}
                                                            className="shrink-0 text-sm font-medium text-blue-600 hover:text-blue-700"
                                                        >
                                                            View Task
                                                        </Link>

                                                    </div>

                                                    <div className="mt-4 flex flex-wrap items-center gap-2">

                                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                                            {task.status}
                                                        </span>

                                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                                            {task.priority}
                                                        </span>

                                                        {isOverdue && (
                                                            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                                                                Overdue
                                                            </span>
                                                        )}

                                                    </div>

                                                    <div className="mt-4 flex flex-col gap-1 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">

                                                        <span>
                                                            Assigned to:{" "}
                                                            <span className="font-medium text-slate-700">
                                                                {task.assignedToName}
                                                            </span>
                                                        </span>

                                                        <span>
                                                            Due:{" "}
                                                            <span className="font-medium text-slate-700">
                                                                {new Date(
                                                                    task.dueDate
                                                                ).toLocaleDateString()}
                                                            </span>
                                                        </span>

                                                    </div>

                                                </div>
                                            );
                                        })}

                                    </div>
                                )}

                            </div>

                        </div>

                    </section>

                    {/* Quick Actions */}

                    <section>

                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">
                                    Quick Actions
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Quickly navigate to commonly used task areas.
                                </p>
                            </div>

                            <div className="mt-6 space-y-3">

                                <Link
                                    to="/tasks"
                                    className="flex items-center justify-between rounded-lg border border-slate-200 p-4 transition hover:border-slate-300 hover:bg-slate-50"
                                >
                                    <div>
                                        <p className="font-medium text-slate-900">
                                            All Tasks
                                        </p>

                                        <p className="mt-1 text-xs text-slate-500">
                                            View all available tasks
                                        </p>
                                    </div>

                                    <span className="text-slate-400">
                                        →
                                    </span>
                                </Link>

                                <Link
                                    to="/my-tasks"
                                    className="flex items-center justify-between rounded-lg border border-slate-200 p-4 transition hover:border-slate-300 hover:bg-slate-50"
                                >
                                    <div>
                                        <p className="font-medium text-slate-900">
                                            My Tasks
                                        </p>

                                        <p className="mt-1 text-xs text-slate-500">
                                            View tasks assigned to you
                                        </p>
                                    </div>

                                    <span className="text-slate-400">
                                        →
                                    </span>
                                </Link>

                                <Link
                                    to="/tasks/create"
                                    className="flex items-center justify-between rounded-lg bg-slate-900 p-4 text-white transition hover:bg-slate-800"
                                >
                                    <div>
                                        <p className="font-medium">
                                            Create Task
                                        </p>

                                        <p className="mt-1 text-xs text-slate-300">
                                            Create a new task
                                        </p>
                                    </div>

                                    <span className="text-slate-300">
                                        +
                                    </span>
                                </Link>

                            </div>

                        </div>

                    </section>

                </div>
            </>
        )}

    </div>
);

};

export default DashboardPage;
