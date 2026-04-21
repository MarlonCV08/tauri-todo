import { changeTaskStatus } from "../services/tasks";
import { TaskStatus } from "./TaskStatus";
interface Props {
    id: number;
    status: "pending" | "in_progress" | "completed";
    description: string;
}

export const Task = ({ id, status, description, onStatusChange }: Props & { onStatusChange: () => void }) => {
    return (
        <li className="p-4 rounded-lg bg-neutral-800 flex gap-3 items-center justify-between transition-all hover:-translate-y-1">
            <span>{description}</span>
            <TaskStatus
                status={status}
                onChange={async (newStatus) => {
                    await changeTaskStatus(newStatus, id)
                    onStatusChange()
                }}
            />
        </li>
    )
}